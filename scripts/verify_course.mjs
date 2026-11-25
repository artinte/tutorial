/* =========================================================
   课程数据 + 渲染自检脚本
   ---------------------------------------------------------
   用法：

       node scripts/verify_course.mjs

   检查内容：

   1. 课程数据能否被加载
   2. 每种 block 的数量
   3. 代码块是否有正文（content）
   4. 渲染器是否产生异常或 undefined
   5. 编号是否正确（1.1 / 1.1.1）
========================================================= */

import path from "node:path";
import { pathToFileURL } from "node:url";

import {
    renderSectionArticle
} from "../js/shared/content_renderer.js";


const base = process.cwd();


function fail(message) {
    console.error(`✗ ${message}`);
    process.exitCode = 1;
}


function ok(message) {
    console.log(`✓ ${message}`);
}


/* =========================================================
   载入课程
========================================================= */

async function loadCourse(modulePath, name) {
    const url = pathToFileURL(
        path.join(base, modulePath)
    ).href;

    const mod = await import(url);

    return {
        name,
        id: mod.COURSE_ID || mod.COURSE?.id,
        chapters: mod.chapters || mod.default
    };
}


/* =========================================================
   检查
========================================================= */

function inspectCourse(course) {

    const types = new Map();

    let sections = 0;
    let codeBlocks = 0;
    let emptyCode = 0;
    let unknownHeadings = 0;

    for (const chapter of course.chapters) {
        for (const section of chapter.sections || []) {
            sections += 1;

            for (const block of section.content || []) {
                const type = block?.type || "paragraph";

                types.set(type, (types.get(type) || 0) + 1);

                if (type === "code") {
                    codeBlocks += 1;

                    const content =
                        block.content ?? block.code ?? "";

                    if (!String(content).trim()) {
                        emptyCode += 1;
                        console.error(
                            `  空代码块：${course.id} / ${section.id} / ${block.title || "(无标题)"}`
                        );
                    }
                }
            }
        }
    }

    if (emptyCode > 0) {
        fail(`${course.name}：${emptyCode} 个代码块没有正文`);
    } else {
        ok(`${course.name}：${codeBlocks} 个代码块都有正文`);
    }

    return { sections, codeBlocks, types, unknownHeadings };
}


/* =========================================================
   渲染检查
========================================================= */

function renderCheck(course) {

    let rendered = 0;
    let problems = 0;

    for (const chapter of course.chapters) {
        (chapter.sections || []).forEach((section, index) => {

            const html = renderSectionArticle({
                chapter,
                section,
                chapterNumber: 1,
                sectionNumber: `1.${index + 1}`
            });

            rendered += 1;

            /*
             * 只检查「整段文本就是一个异常值」的情况。
             * 正文里出现 NaN 之类的术语是合法的，
             * 但渲染出 >undefined< 或属性值为 undefined 就是 bug。
             */

            if (
                />\s*(undefined|NaN)\s*</.test(html) ||
                /="\s*(undefined|NaN)\s*"/.test(html)
            ) {
                problems += 1;
                console.error(
                    `  渲染结果包含异常值：${section.id}`
                );
            }

            if (html.includes("未知内容类型")) {
                problems += 1;
            }
        });
    }

    if (problems > 0) {
        fail(`${course.name}：${problems} 个渲染问题`);
    } else {
        ok(`${course.name}：${rendered} 个小节渲染通过`);
    }
}


/* =========================================================
   编号检查
========================================================= */

function numberingCheck() {

    const sample = renderSectionArticle({
        chapter: { id: "c1", title: "示例章" },
        section: {
            id: "s1",
            title: "示例小节",
            description: "导语",
            content: [
                { type: "paragraph", text: "正文" },
                { type: "heading", text: "第一个小标题" },
                { type: "paragraph", text: "正文" },
                { type: "heading", text: "第二个小标题" }
            ]
        },
        chapterNumber: 2,
        sectionNumber: "2.3"
    });

    const numbers = [
        ...sample.matchAll(
            /class="ck-heading-number">([^<]+)</g
        )
    ].map(match => match[1]);

    const expected = ["2.3.1", "2.3.2"];

    if (JSON.stringify(numbers) !== JSON.stringify(expected)) {
        fail(`小标题编号不正确：${JSON.stringify(numbers)}`);
    } else {
        ok(`小标题自动编号：${numbers.join(" / ")}`);
    }

    if (!sample.includes("2.3")) {
        fail("小节编号没有出现在文章中");
    }
}


/* =========================================================
   运行
========================================================= */

const courses = [
    await loadCourse("js/python_quick_start/chapters.js", "Python 快速入门"),
    await loadCourse("js/deep_learning_fundamentals/chapters.js", "深度学习基础")
];

for (const course of courses) {

    console.log(`\n=== ${course.name} ===`);

    if (!Array.isArray(course.chapters) || course.chapters.length === 0) {
        fail(`${course.name}：没有章节数据`);
        continue;
    }

    const info = inspectCourse(course);

    console.log(
        `   章节 ${course.chapters.length} 个 / 小节 ${info.sections} 个 / 代码块 ${info.codeBlocks} 个`
    );

    const summary = [...info.types.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => `${type}:${count}`)
        .join("  ");

    console.log(`   类型 ${summary}`);

    renderCheck(course);
}

console.log("\n=== 编号 ===");
numberingCheck();

console.log(
    process.exitCode ? "\n存在检查失败项。" : "\n全部检查通过。"
);
