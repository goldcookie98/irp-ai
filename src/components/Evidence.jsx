import { motion } from 'framer-motion';
import AnimatedBarChart from './AnimatedBarChart';

export default function Evidence() {
    // Data for Water Consumption Chart
    const waterData = [
        { label: 'ChatGPT', sublabel: '~300 queries', value: 1 },
        { label: 'TV', sublabel: '1 hour', value: 4 },
        { label: 'Hamburger', sublabel: '1 burger', value: 660 }
    ];

    // Data for Text Writing Carbon Footprint (logarithmic)
    const textCarbonData = [
        { label: 'BLOOM', sublabel: 'writing one page', value: 0.7 },
        { label: 'ChatGPT', sublabel: 'writing one page', value: 1.2 },
        { label: 'Laptop', sublabel: 'for duration of human writing one page', value: 20 },
        { label: 'Desktop', sublabel: 'for duration of human writing one page', value: 70 },
        { label: 'Human (From India)', sublabel: 'writing one page', value: 150 },
        { label: 'Human (From US)', sublabel: 'writing one page', value: 1000 }
    ];

    // Data for Image Creation Carbon Footprint (logarithmic)
    const imageCarbonData = [
        { label: 'Midjourney', sublabel: 'creating one image', value: 1.5 },
        { label: 'DALL-E2', sublabel: 'creating one image', value: 1.8 },
        { label: 'Laptop', sublabel: 'for duration of human creating one image', value: 100 },
        { label: 'Desktop', sublabel: 'for duration of human creating one image', value: 300 },
        { label: 'Human (From India)', sublabel: 'creating one image', value: 700 },
        { label: 'Human (From US)', sublabel: 'creating one image', value: 5000 }
    ];

    return (
        <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-32 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">Evidence 📊</h2>
                    <div className="text-6xl md:text-8xl font-bold text-blue-500 my-8">
                        1.5% - 4%
                    </div>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        Potential global greenhouse gas emission reduction by AI by 2030.
                    </p>
                </motion.div>

                {/* Chart Section 1: Water Consumption */}
                <div className="grid md:grid-cols-5 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">The Real Water Cost</h3>
                        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                            We worry about AI's water consumption, but how does it actually compare to our daily activities?
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            While ~300 ChatGPT queries use about 1 gallon of water, a single hamburger requires
                            <span className="text-orange-400 font-bold"> ~660 gallons</span>.
                            The narrative around AI's environmental impact often overlooks this crucial context.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-3"
                    >
                        <AnimatedBarChart
                            data={waterData}
                            title="Water Consumption (Gallons)"
                            yAxisLabel="Water (Gallons)"
                            maxValue={660}
                            isLogarithmic={false}
                        />
                    </motion.div>
                </div>

                {/* Chart Section 2: Carbon Footprint for Text Writing */}
                <div className="grid md:grid-cols-5 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Carbon Cost of Writing</h3>
                        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                            AI-powered writing tools are dramatically more efficient than traditional methods.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            ChatGPT and BLOOM produce just <span className="text-blue-400 font-bold">~1 gram of CO2e</span> per page,
                            while a human writer in the US generates <span className="text-white font-bold">~1000 grams</span> -
                            that's <span className="text-red-400 font-bold">1000x more</span> carbon emissions for the same output.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-3"
                    >
                        <AnimatedBarChart
                            data={textCarbonData}
                            title="Carbon footprint (grams CO2e) for Text Writing"
                            yAxisLabel="Carbon footprint (grams CO2e, log scale)"
                            maxValue={1000}
                            isLogarithmic={true}
                        />
                    </motion.div>
                </div>

                {/* Chart Section 3: Carbon Footprint for Image Creation */}
                <div className="grid md:grid-cols-5 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Carbon Cost of Images</h3>
                        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                            AI image generation is revolutionizing creative work with minimal environmental impact.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Midjourney and DALL-E2 create images with just <span className="text-blue-400 font-bold">~1-2 grams of CO2e</span>,
                            while a human artist in the US produces <span className="text-white font-bold">~5000 grams</span> -
                            over <span className="text-red-400 font-bold">2500x more</span> emissions per image.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-3"
                    >
                        <AnimatedBarChart
                            data={imageCarbonData}
                            title="Carbon footprint (grams CO2e) for Image Creation"
                            yAxisLabel="Carbon footprint (grams CO2e, log scale)"
                            maxValue={5000}
                            isLogarithmic={true}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
