import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ScrollDrivenChart({
    storySteps,
    data,
    title,
    yAxisLabel,
    isLogarithmic = false,
    maxValue
}) {
    const containerRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Track window size for responsive layout
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 900);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Track scroll progress through this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress to current step (0 to storySteps.length - 1)
    const currentStepIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, storySteps.length - 1]
    );

    // Calculate height percentage for each bar
    const getBarHeight = (value) => {
        if (value === 0) return 0;
        if (isLogarithmic) {
            const logValue = Math.log10(value + 1);
            const logMax = Math.log10(maxValue + 1);
            return (logValue / logMax) * 100;
        }
        return (value / maxValue) * 100;
    };

    // Format value for display
    const formatValue = (value) => {
        if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
        if (value < 1 && value > 0) return value.toFixed(1);
        return value.toFixed(0);
    };

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                height: `${storySteps.length * 100}vh`, // Creates scroll distance
            }}
        >
            {/* Sticky container that stays in view while scrolling */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                padding: '0 20px'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1400px',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    gap: isSmallScreen ? '40px' : '80px',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Left: Dynamic Text */}
                    <motion.div
                        style={{
                            color: '#fff',
                            flex: isSmallScreen ? 'none' : '1',
                            width: isSmallScreen ? '100%' : 'auto',
                            position: 'relative',
                            minHeight: isSmallScreen ? '100px' : '200px'
                        }}
                    >
                        {storySteps.map((step, index) => (
                            <motion.div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    fontSize: isSmallScreen ? '20px' : '32px',
                                    fontWeight: '700',
                                    lineHeight: '1.4',
                                    opacity: useTransform(
                                        scrollYProgress,
                                        [
                                            (index) / storySteps.length,
                                            (index + 0.3) / storySteps.length,
                                            (index + 0.7) / storySteps.length,
                                            (index + 1) / storySteps.length
                                        ],
                                        [0, 1, 1, 0]
                                    )
                                }}
                            >
                                {step.text}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: Chart with incremental bars */}
                    <div style={{
                        width: isSmallScreen ? '100%' : '50%',
                        maxWidth: isSmallScreen ? '500px' : 'none',
                        height: '500px',
                        padding: '24px',
                        backgroundColor: '#000',
                        borderRadius: '12px'
                    }}>
                        {/* Title */}
                        {title && (
                            <div style={{
                                marginBottom: '24px',
                                fontSize: '24px',
                                fontWeight: '900',
                                color: '#fff',
                                textAlign: 'center'
                            }}>
                                {title}
                            </div>
                        )}

                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '380px',
                            display: 'flex',
                            gap: '16px'
                        }}>
                            {/* Y-axis values */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                paddingRight: '16px',
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#fff',
                                width: '64px',
                                textAlign: 'right'
                            }}>
                                <span>{formatValue(maxValue)}</span>
                                <span>{formatValue(maxValue * 0.75)}</span>
                                <span>{formatValue(maxValue * 0.5)}</span>
                                <span>{formatValue(maxValue * 0.25)}</span>
                                <span>0</span>
                            </div>

                            {/* Chart Area */}
                            <div style={{
                                position: 'relative',
                                flex: '1',
                                height: '100%',
                                borderLeft: '4px solid #fff',
                                borderBottom: '4px solid #fff',
                                backgroundColor: '#000'
                            }}>
                                {/* Bars Container */}
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    top: 0,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-around',
                                    gap: '32px',
                                    padding: '0 24px'
                                }}>
                                    {data.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                flex: '1',
                                                height: '100%',
                                                justifyContent: 'flex-end',
                                                position: 'relative',
                                                opacity: useTransform(
                                                    scrollYProgress,
                                                    (() => {
                                                        // Find when this bar should appear
                                                        const appearStep = storySteps.findIndex(step => step.visibleBars > index);
                                                        if (appearStep === -1) return [0, 1];

                                                        const startProgress = appearStep / storySteps.length;
                                                        const fadeInEnd = (appearStep + 0.3) / storySteps.length;

                                                        return [0, startProgress, fadeInEnd, 1];
                                                    })(),
                                                    (() => {
                                                        const appearStep = storySteps.findIndex(step => step.visibleBars > index);
                                                        if (appearStep === -1) return [0, 0];

                                                        return [0, 0, 1, 1]; // Stay invisible until startProgress, fade to 1, then stay 1
                                                    })()
                                                )
                                            }}
                                        >
                                            {/* Bar Value */}
                                            <div style={{
                                                marginBottom: '12px',
                                                fontSize: '16px',
                                                fontWeight: '900',
                                                color: '#fff'
                                            }}>
                                                {formatValue(item.value)}
                                            </div>

                                            {/* Bar */}
                                            <motion.div
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '70px',
                                                    height: `${getBarHeight(item.value)}%`,
                                                    background: '#fff',
                                                    border: '2px solid #fff',
                                                    borderRadius: '8px 8px 0 0',
                                                    boxShadow: '0 10px 20px rgba(255, 255, 255, 0.3)',
                                                    minHeight: '0px'
                                                }}
                                            />

                                            {/* X-axis Label - positioned below the axis */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-40px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                textAlign: 'center',
                                                color: '#fff',
                                                width: '120px',
                                                lineHeight: '1.2',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }} title={item.label}>
                                                {item.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
