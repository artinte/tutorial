/* =========================================================
   DEEP LEARNING HERO
   Logistic Regression / Neural Network Training Visualization
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const dataPointsEl =
        document.getElementById("dataPoints");

    const decisionLine =
        document.getElementById("decisionLine");

    const decisionRegion =
        document.querySelector(".decision-region");

    const connectionsEl =
        document.getElementById("networkConnections");

    const neuronsEl =
        document.getElementById("networkNeurons");

    const particlesEl =
        document.getElementById("networkParticles");

    const epochEl =
        document.getElementById("epochValue");

    const lossEl =
        document.getElementById("lossValue");

    const accuracyEl =
        document.getElementById("accuracyValue");

    const progressEl =
        document.getElementById("trainingProgressBar");

    const phaseEl =
        document.getElementById("trainingPhase");


    if (
        !dataPointsEl ||
        !decisionLine ||
        !connectionsEl ||
        !neuronsEl
    ) {
        return;
    }


    /* =====================================================
       DATASET
    ===================================================== */

    const dataset = [

        // =====================================================
        // CLASS 0
        // 左上区域
        // =====================================================

        { x: 5, y: 92, label: 0 },
        { x: 9, y: 76, label: 0 },
        { x: 12, y: 88, label: 0 },
        { x: 16, y: 67, label: 0 },
        { x: 19, y: 94, label: 0 },
        { x: 22, y: 81, label: 0 },
        { x: 25, y: 72, label: 0 },
        { x: 28, y: 89, label: 0 },
        { x: 31, y: 64, label: 0 },
        { x: 34, y: 78, label: 0 },
        { x: 37, y: 91, label: 0 },
        { x: 40, y: 69, label: 0 },
        { x: 43, y: 83, label: 0 },

        { x: 6, y: 61, label: 0 },
        { x: 10, y: 52, label: 0 },
        { x: 14, y: 70, label: 0 },
        { x: 18, y: 58, label: 0 },
        { x: 21, y: 73, label: 0 },
        { x: 24, y: 63, label: 0 },
        { x: 27, y: 55, label: 0 },
        { x: 30, y: 68, label: 0 },
        { x: 33, y: 52, label: 0 },
        { x: 36, y: 62, label: 0 },
        { x: 39, y: 54, label: 0 },

        { x: 5, y: 42, label: 0 },
        { x: 9, y: 34, label: 0 },
        { x: 13, y: 48, label: 0 },
        { x: 17, y: 39, label: 0 },
        { x: 20, y: 51, label: 0 },
        { x: 23, y: 43, label: 0 },
        { x: 26, y: 36, label: 0 },
        { x: 29, y: 47, label: 0 },
        { x: 32, y: 38, label: 0 },

        { x: 7, y: 20, label: 0 },
        { x: 12, y: 28, label: 0 },
        { x: 16, y: 17, label: 0 },
        { x: 21, y: 31, label: 0 },
        { x: 25, y: 22, label: 0 },
        { x: 30, y: 30, label: 0 },


        // =====================================================
        // CLASS 1
        // 右下区域
        // =====================================================

        { x: 47, y: 27, label: 1 },
        { x: 51, y: 19, label: 1 },
        { x: 55, y: 31, label: 1 },
        { x: 59, y: 17, label: 1 },
        { x: 63, y: 25, label: 1 },
        { x: 67, y: 12, label: 1 },
        { x: 71, y: 22, label: 1 },
        { x: 75, y: 10, label: 1 },
        { x: 79, y: 19, label: 1 },
        { x: 84, y: 8, label: 1 },
        { x: 89, y: 16, label: 1 },
        { x: 94, y: 7, label: 1 },

        { x: 48, y: 43, label: 1 },
        { x: 52, y: 35, label: 1 },
        { x: 56, y: 48, label: 1 },
        { x: 60, y: 39, label: 1 },
        { x: 64, y: 51, label: 1 },
        { x: 68, y: 42, label: 1 },
        { x: 72, y: 34, label: 1 },
        { x: 76, y: 46, label: 1 },
        { x: 80, y: 37, label: 1 },
        { x: 85, y: 49, label: 1 },
        { x: 90, y: 33, label: 1 },
        { x: 96, y: 44, label: 1 },

        { x: 53, y: 59, label: 1 },
        { x: 57, y: 67, label: 1 },
        { x: 61, y: 54, label: 1 },
        { x: 65, y: 63, label: 1 },
        { x: 69, y: 55, label: 1 },
        { x: 73, y: 68, label: 1 },
        { x: 77, y: 57, label: 1 },
        { x: 81, y: 71, label: 1 },
        { x: 86, y: 61, label: 1 },
        { x: 91, y: 72, label: 1 },
        { x: 96, y: 58, label: 1 },

        { x: 58, y: 82, label: 1 },
        { x: 63, y: 74, label: 1 },
        { x: 68, y: 86, label: 1 },
        { x: 72, y: 78, label: 1 },
        { x: 77, y: 90, label: 1 },
        { x: 82, y: 80, label: 1 },
        { x: 87, y: 91, label: 1 },
        { x: 92, y: 83, label: 1 },
        { x: 97, y: 94, label: 1 },


        // =====================================================
        // 分界线附近少量干扰点
        // =====================================================

        { x: 40, y: 55, label: 0 },
        { x: 43, y: 50, label: 1 },
        { x: 46, y: 46, label: 0 },
        { x: 49, y: 42, label: 1 },
        { x: 52, y: 38, label: 0 },
        { x: 55, y: 34, label: 1 },
        { x: 58, y: 30, label: 0 },
        { x: 61, y: 26, label: 1 }

    ];


    /* =====================================================
       RENDER DATA
    ===================================================== */

    function renderDataset() {

        dataPointsEl.innerHTML = "";

        dataset.forEach(
            (point, index) => {

                const el =
                    document.createElement("div");


                el.className =
                    "data-point " +
                    (
                        point.label === 0
                            ? "class-a"
                            : "class-b"
                    );


                el.style.left =
                    `${point.x}%`;


                el.style.top =
                    `${100 - point.y}%`;


                el.style.animationDelay =
                    `${index * 35}ms`;


                el.dataset.index =
                    String(index);


                dataPointsEl.appendChild(
                    el
                );

            }
        );

    }


    renderDataset();


    /* =====================================================
       NETWORK STRUCTURE
    ===================================================== */

    const layers = [

        {
            name: "input",
            x: 60,
            ys: [55, 130, 205]
        },

        {
            name: "hidden1",
            x: 190,
            ys: [35, 90, 145, 200, 235]
        },

        {
            name: "hidden2",
            x: 330,
            ys: [55, 110, 165, 220]
        },

        {
            name: "output",
            x: 460,
            ys: [130]
        }

    ];


    /* =====================================================
       CREATE CONNECTIONS
    ===================================================== */

    const connectionObjects = [];


    function createConnections() {

        connectionsEl.innerHTML = "";

        connectionObjects.length = 0;


        for (
            let layerIndex = 0;
            layerIndex < layers.length - 1;
            layerIndex++
        ) {

            const current =
                layers[layerIndex];

            const next =
                layers[layerIndex + 1];


            current.ys.forEach(
                (y1, sourceIndex) => {

                    next.ys.forEach(
                        (y2, targetIndex) => {

                            const line =
                                document.createElementNS(
                                    "http://www.w3.org/2000/svg",
                                    "line"
                                );


                            line.setAttribute(
                                "x1",
                                current.x
                            );


                            line.setAttribute(
                                "y1",
                                y1
                            );


                            line.setAttribute(
                                "x2",
                                next.x
                            );


                            line.setAttribute(
                                "y2",
                                y2
                            );


                            line.classList.add(
                                "network-link"
                            );


                            connectionsEl.appendChild(
                                line
                            );


                            connectionObjects.push({

                                line,

                                layer:
                                    layerIndex,

                                source:
                                    sourceIndex,

                                target:
                                    targetIndex

                            });

                        }
                    );

                }
            );

        }

    }


    createConnections();


    /* =====================================================
       CREATE NEURONS
    ===================================================== */

    const neuronObjects = [];


    function createNeurons() {

        neuronsEl.innerHTML = "";

        neuronObjects.length = 0;


        layers.forEach(
            (layer, layerIndex) => {

                layer.ys.forEach(
                    (y, neuronIndex) => {

                        const circle =
                            document.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "circle"
                            );


                        circle.setAttribute(
                            "cx",
                            layer.x
                        );


                        circle.setAttribute(
                            "cy",
                            y
                        );


                        circle.setAttribute(
                            "r",
                            layer.name === "output"
                                ? 15
                                : 11
                        );


                        circle.classList.add(
                            "network-neuron"
                        );


                        if (
                            layer.name === "output"
                        ) {

                            circle.classList.add(
                                "output"
                            );

                        }


                        neuronsEl.appendChild(
                            circle
                        );


                        neuronObjects.push({

                            element:
                                circle,

                            layer:
                                layerIndex,

                            index:
                                neuronIndex

                        });

                    }
                );

            }
        );

    }


    createNeurons();


    /* =====================================================
       TRAINING STATE
    ===================================================== */

    let epoch = 0;

    const maxEpochs = 5;


    /*
     * =====================================================
     * Logistic Regression
     * =====================================================
     *
     * Features are normalized to:
     *
     *     -1 ... +1
     *
     * instead of:
     *
     *      0 ... 1
     *
     * This gives gradient descent
     * much better numerical behavior.
     */

    let weightX =
        0.25;

    let weightY =
        -0.25;

    let bias =
        0;


    /*
     * Slightly stronger learning rate.
     *
     * Combined with multiple gradient
     * updates per visual epoch this
     * makes the model converge quickly.
     */

    const learningRate =
        0.8;


    /*
     * Number of actual gradient updates
     * performed during one visual epoch.
     *
     * This does NOT fake the result.
     *
     * It simply means one displayed
     * training step represents several
     * optimization iterations.
     */

    const gradientStepsPerEpoch =
        3;


    /* =====================================================
       FEATURE NORMALIZATION
    ===================================================== */

    function normalizeX(
        value
    ) {

        return (
            value / 50
        ) - 1;

    }


    function normalizeY(
        value
    ) {

        return (
            value / 50
        ) - 1;

    }


    /* =====================================================
       SIGMOID
    ===================================================== */

    function sigmoid(x) {

        const safeX =
            Math.max(
                -50,
                Math.min(
                    50,
                    x
                )
            );


        return (
            1 /
            (
                1 +
                Math.exp(
                    -safeX
                )
            )
        );

    }


    /* =====================================================
       PREDICTION
    ===================================================== */

    function predict(point) {

        const x =
            normalizeX(
                point.x
            );

        const y =
            normalizeY(
                point.y
            );


        const z =
            weightX * x +
            weightY * y +
            bias;


        return sigmoid(z);

    }


    /* =====================================================
       CALCULATE LOSS
    ===================================================== */

    function calculateLoss() {

        let total = 0;


        dataset.forEach(
            point => {

                const prediction =
                    predict(point);

                const y =
                    point.label;


                const epsilon =
                    0.00001;


                total +=
                    -(
                        y *
                        Math.log(
                            prediction +
                            epsilon
                        )
                        +
                        (1 - y) *
                        Math.log(
                            1 -
                            prediction +
                            epsilon
                        )
                    );

            }
        );


        return (
            total /
            dataset.length
        );

    }


    /* =====================================================
       CALCULATE ACCURACY
    ===================================================== */

    function calculateAccuracy() {

        let correct = 0;


        dataset.forEach(
            point => {

                const prediction =
                    predict(point);


                const predicted =
                    prediction >= 0.5
                        ? 1
                        : 0;


                if (
                    predicted ===
                    point.label
                ) {

                    correct++;

                }

            }
        );


        return (
            correct /
            dataset.length
        );

    }


    /* =====================================================
       UPDATE MODEL
       REAL GRADIENT DESCENT
    ===================================================== */

    function updateModel() {

        let gradientWeightX =
            0;

        let gradientWeightY =
            0;

        let gradientBias =
            0;


        /* ---------------------------------------------
           Calculate gradients
        --------------------------------------------- */

        dataset.forEach(
            point => {

                const x =
                    normalizeX(
                        point.x
                    );

                const y =
                    normalizeY(
                        point.y
                    );


                const prediction =
                    predict(point);


                const error =
                    prediction -
                    point.label;


                gradientWeightX +=
                    error *
                    x;


                gradientWeightY +=
                    error *
                    y;


                gradientBias +=
                    error;

            }
        );


        /* ---------------------------------------------
           Mean gradient
        --------------------------------------------- */

        gradientWeightX /=
            dataset.length;

        gradientWeightY /=
            dataset.length;

        gradientBias /=
            dataset.length;


        /* ---------------------------------------------
           Gradient descent
        --------------------------------------------- */

        weightX -=
            learningRate *
            gradientWeightX;


        weightY -=
            learningRate *
            gradientWeightY;


        bias -=
            learningRate *
            gradientBias;


        /* ---------------------------------------------
           Numerical stability
        --------------------------------------------- */

        weightX =
            Math.max(
                -12,
                Math.min(
                    12,
                    weightX
                )
            );


        weightY =
            Math.max(
                -12,
                Math.min(
                    12,
                    weightY
                )
            );


        bias =
            Math.max(
                -12,
                Math.min(
                    12,
                    bias
                )
            );

    }


    /* =====================================================
       DECISION BOUNDARY
    ===================================================== */

    function updateDecisionBoundary() {

        /*
         * Boundary:
         *
         *     weightX * x
         *   + weightY * y
         *   + bias
         *   = 0
         *
         *
         * Instead of rotating a line around
         * its left edge, calculate the visual
         * line from two actual points.
         *
         * This eliminates the "half line"
         * problem caused by CSS rotation.
         */


        if (
            Math.abs(weightY) <
            0.000001
        ) {

            return;

        }


        const container =
            decisionLine.parentElement;


        if (
            !container
        ) {

            return;

        }


        const width =
            container.clientWidth;


        const height =
            container.clientHeight;


        if (
            width <= 0 ||
            height <= 0
        ) {

            return;

        }


        /*
         * Solve the boundary at
         * x = -1 and x = +1.
         *
         * Normalized coordinate:
         *
         *     -1 ... +1
         */

        const x1 =
            -1;

        const x2 =
            1;


        const y1 =
            -(
                weightX *
                x1 +
                bias
            ) /
            weightY;


        const y2 =
            -(
                weightX *
                x2 +
                bias
            ) /
            weightY;


        /*
         * Convert normalized data
         * coordinates into percentage.
         *
         * x:
         *     -1 -> 0%
         *     +1 -> 100%
         *
         * y:
         *     +1 -> 0%
         *     -1 -> 100%
         */

        const px1 =
            (
                x1 + 1
            ) *
            50;

        const px2 =
            (
                x2 + 1
            ) *
            50;


        const py1 =
            50 -
            y1 *
            50;

        const py2 =
            50 -
            y2 *
            50;


        /*
         * Calculate the line center.
         */

        const centerX =
            (
                px1 +
                px2
            ) /
            2;


        const centerY =
            (
                py1 +
                py2
            ) /
            2;


        /*
         * Calculate the visual angle.
         */

        const dx =
            (
                px2 -
                px1
            );


        const dy =
            (
                py2 -
                py1
            );


        /*
         * Account for actual container
         * aspect ratio.
         *
         * This is important:
         *
         * 50% X is not necessarily the
         * same physical distance as
         * 50% Y.
         */

        const physicalDx =
            dx *
            width /
            100;


        const physicalDy =
            dy *
            height /
            100;


        const angle =
            Math.atan2(
                physicalDy,
                physicalDx
            ) *
            (
                180 /
                Math.PI
            );


        /*
         * Use the actual diagonal of the
         * container, plus some extra length.
         *
         * Therefore the line remains visible
         * even when the angle becomes steep.
         */

        const lineLength =
            Math.sqrt(
                width * width +
                height * height
            ) *
            1.25;


        decisionLine.style.width =
            `${lineLength}px`;


        /*
         * Center the line first,
         * then rotate around its center.
         */

        decisionLine.style.left =
            `${centerX}%`;


        decisionLine.style.top =
            `${centerY}%`;


        decisionLine.style.transformOrigin =
            "center center";


        decisionLine.style.transform =
            `translate(-50%, -50%) rotate(${angle}deg)`;


        /*
         * Colored decision region.
         *
         * Keep the existing visual concept,
         * but use the actual boundary center.
         */

        if (
            decisionRegion
        ) {

            const region =
                Math.max(
                    15,
                    Math.min(
                        75,
                        centerY +
                        8
                    )
                );


            decisionRegion.style.clipPath =
                `polygon(
                    0 0,
                    ${region}% 0,
                    ${region - 12}% 100%,
                    0 100%
                )`;

        }

    }


    /* =====================================================
       UI
    ===================================================== */

    function updateStats() {

        const loss =
            calculateLoss();


        const accuracy =
            calculateAccuracy();


        epochEl.textContent =
            String(epoch)
                .padStart(
                    3,
                    "0"
                );


        lossEl.textContent =
            loss.toFixed(3);


        accuracyEl.textContent = `${(accuracy * 100).toFixed(1)}%`;


        progressEl.style.width =
            `${(
                epoch /
                maxEpochs
            ) * 100}%`;

    }


    /* =====================================================
       PHASE
    ===================================================== */

    function setPhase(
        phase
    ) {

        phaseEl.textContent =
            phase;

    }


    /* =====================================================
       ACTIVATE NEURONS
    ===================================================== */

    function activateLayer(
        layerIndex
    ) {

        neuronObjects
            .filter(
                n =>
                    n.layer ===
                    layerIndex
            )
            .forEach(
                n => {

                    n.element.classList.add(
                        "active"
                    );


                    setTimeout(
                        () => {

                            n.element.classList.remove(
                                "active"
                            );

                        },
                        300
                    );

                }
            );

    }


    /* =====================================================
       ACTIVATE CONNECTIONS
    ===================================================== */

    function activateConnections(
        layerIndex
    ) {

        connectionObjects
            .filter(
                c =>
                    c.layer ===
                    layerIndex
            )
            .forEach(
                c => {

                    c.line.classList.add(
                        "active"
                    );


                    setTimeout(
                        () => {

                            c.line.classList.remove(
                                "active"
                            );

                        },
                        350
                    );

                }
            );

    }


    /* =====================================================
       FLOW PARTICLE
    ===================================================== */

    function createFlowParticle(
        fromLayer,
        toLayer,
        backward = false
    ) {

        const source =
            layers[fromLayer];


        const target =
            layers[toLayer];


        const particle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        particle.setAttribute(
            "r",
            "3.5"
        );


        particle.classList.add(
            "flow-particle"
        );


        if (
            backward
        ) {

            particle.classList.add(
                "backward"
            );

        }


        const sourceY =
            source.ys[
            Math.floor(
                Math.random() *
                source.ys.length
            )
            ];


        const targetY =
            target.ys[
            Math.floor(
                Math.random() *
                target.ys.length
            )
            ];


        const startX =
            source.x;


        const startY =
            sourceY;


        const endX =
            target.x;


        const endY =
            targetY;


        particle.setAttribute(
            "cx",
            startX
        );


        particle.setAttribute(
            "cy",
            startY
        );


        particlesEl.appendChild(
            particle
        );


        const duration =
            backward
                ? 520
                : 650;


        const startTime =
            performance.now();


        function animate(
            currentTime
        ) {

            const progress =
                Math.min(
                    1,
                    (
                        currentTime -
                        startTime
                    ) /
                    duration
                );


            const eased =
                progress *
                (
                    2 -
                    progress
                );


            const x =
                startX +
                (
                    endX -
                    startX
                ) *
                eased;


            const y =
                startY +
                (
                    endY -
                    startY
                ) *
                eased;


            particle.setAttribute(
                "cx",
                x
            );


            particle.setAttribute(
                "cy",
                y
            );


            if (
                progress <
                1
            ) {

                requestAnimationFrame(
                    animate
                );

            } else {

                particle.remove();

            }

        }


        requestAnimationFrame(
            animate
        );

    }


    /* =====================================================
       FORWARD PASS
    ===================================================== */

    function forwardPass() {

        setPhase(
            "FORWARD PASS"
        );


        activateLayer(0);

        activateConnections(0);


        setTimeout(
            () => {

                activateLayer(1);

                activateConnections(1);

            },
            180
        );


        setTimeout(
            () => {

                activateLayer(2);

                activateConnections(2);

            },
            380
        );


        setTimeout(
            () => {

                activateLayer(3);

            },
            560
        );


        /* ---------------------------------------------
           Flow particles
        --------------------------------------------- */

        for (
            let i = 0;
            i < 3;
            i++
        ) {

            setTimeout(
                () => {

                    createFlowParticle(
                        0,
                        1
                    );

                },
                i * 100
            );

        }


        for (
            let i = 0;
            i < 3;
            i++
        ) {

            setTimeout(
                () => {

                    createFlowParticle(
                        1,
                        2
                    );

                },
                220 +
                i * 100
            );

        }


        for (
            let i = 0;
            i < 2;
            i++
        ) {

            setTimeout(
                () => {

                    createFlowParticle(
                        2,
                        3
                    );

                },
                440 +
                i * 120
            );

        }

    }


    /* =====================================================
       BACK PROPAGATION
    ===================================================== */

    function backwardPass() {

        setPhase(
            "BACKPROPAGATION"
        );


        /*
         * Highlight connections
         * in reverse direction.
         */

        connectionObjects
            .forEach(
                c => {

                    c.line.classList.add(
                        "backward"
                    );

                }
            );


        /*
         * Backward particles.
         */

        for (
            let i = 0;
            i < 3;
            i++
        ) {

            setTimeout(
                () => {

                    createFlowParticle(
                        3,
                        2,
                        true
                    );

                },
                i * 100
            );

        }


        setTimeout(
            () => {

                createFlowParticle(
                    2,
                    1,
                    true
                );

            },
            180
        );


        setTimeout(
            () => {

                createFlowParticle(
                    1,
                    0,
                    true
                );

            },
            360
        );


        setTimeout(
            () => {

                connectionObjects
                    .forEach(
                        c => {

                            c.line.classList.remove(
                                "backward"
                            );

                        }
                    );

            },
            550
        );

    }


    /* =====================================================
       HIGHLIGHT DATA
    ===================================================== */

    function highlightData() {

        const points =
            document.querySelectorAll(
                ".data-point"
            );


        points.forEach(
            point => {

                point.classList.remove(
                    "active"
                );

            }
        );


        /*
         * Select a small batch
         * to represent a mini-batch.
         */

        const shuffled =
            Array.from(points)
                .sort(
                    () =>
                        Math.random() -
                        0.5
                );


        shuffled
            .slice(
                0,
                5
            )
            .forEach(
                point => {

                    point.classList.add(
                        "active"
                    );

                }
            );

    }


    /* =====================================================
       RESET MODEL
    ===================================================== */

    function resetModel() {

        epoch = 0;

        weightX =
            0.25;

        weightY =
            -0.25;

        bias =
            0;

        updateDecisionBoundary();

    }


    /* =====================================================
       TRAINING LOOP
    ===================================================== */

    function trainingStep() {

        if (epoch >= maxEpochs) {
            return;
        }


        epoch++;


        highlightData();


        /* ---------------------------------------------
           Forward propagation
        --------------------------------------------- */

        forwardPass();


        /*
         * Wait for forward propagation
         * before calculating loss.
         */

        setTimeout(
            () => {

                const loss =
                    calculateLoss();


                lossEl.textContent =
                    loss.toFixed(3);


                /* -----------------------------------------
                   Backpropagation
                ----------------------------------------- */

                backwardPass();


                /*
                 * Perform several REAL gradient descent iterations.
                 */

                setTimeout(
                    () => {

                        for (
                            let i = 0;
                            i <
                            gradientStepsPerEpoch;
                            i++
                        ) {

                            updateModel();

                        }

                        updateDecisionBoundary();

                        updateStats();


                        /* ---------------------------------------------
                           Continue training until 10 epochs
                        --------------------------------------------- */

                        if (epoch < maxEpochs) {

                            setTimeout(
                                trainingStep,
                                680
                            );

                        }

                    },
                    180
                );

            },
            520
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateDecisionBoundary();

    updateStats();


    /* =====================================================
       START
    ===================================================== */

    let trainingTimer =
        null;


    function startTraining() {
        if (epoch >= maxEpochs) {
            return;
        }
        trainingStep();
    }

    startTraining();


    /* =====================================================
       RESIZE
       Recalculate the actual visual line
       when the browser/container changes size.
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            updateDecisionBoundary();

        }
    );


    /* =====================================================
       VISIBILITY CONTROL
       Stop animation when page is hidden.
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                if (
                    trainingTimer
                ) {

                    clearInterval(
                        trainingTimer
                    );

                    trainingTimer =
                        null;

                }

            } else {

                startTraining();

            }

        }
    );


})();
