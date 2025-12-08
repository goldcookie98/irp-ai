import { motion } from 'framer-motion';
import { BarChart, Search, Tv, Utensils } from 'lucide-react';

export default function Evidence() {
    return (
        <section className="section-container min-h-screen py-20">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">Saving the Planet 🌍</h2>
                    <div className="text-6xl md:text-9xl font-bold text-blue-500 my-8">
                        1.5% - 4%
                    </div>
                    <p className="text-xl md:text-2xl text-gray-400">
                        Potential global greenhouse gas emission reduction by Ai by 2030.
                    </p>
                </motion.div>

                {/* Comparison Chart based on the User's Image */}
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Context */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl md:text-4xl font-bold mb-6">The Real Water Cost</h3>
                        <p className="text-lg text-gray-400 mb-6">
                            We worry about AI's water consumption, but how does it actually compare to daily activities?
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center gap-3">
                                <Search className="text-blue-500" /> ~300 ChatGPT queries = 1 gallon
                            </li>
                            <li className="flex items-center gap-3">
                                <Tv className="text-purple-500" /> 1 hour of TV = ~4 gallons (Power gen)
                            </li>
                            <li className="flex items-center gap-3">
                                <Utensils className="text-orange-500" /> 1 Hamburger = ~660 gallons
                            </li>
                        </ul>
                    </motion.div>

                    {/* Visual Bar Chart */}
                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/10 relative h-[400px] flex items-end justify-around gap-4">
                        {/* 1 Gallon (ChatGPT) */}
                        <div className="flex flex-col items-center w-1/3 group">
                            <div className="mb-2 text-xs text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">1 gal</div>
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '5px' }} // Scale relative to 660 is tiny, so we give it a min visibility
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="w-full bg-blue-500 rounded-t-lg relative"
                            >
                                <div className="absolute -top-8 w-full text-center font-bold">AI</div>
                            </motion.div>
                        </div>

                        {/* 4 Gallons (TV) */}
                        <div className="flex flex-col items-center w-1/3 group">
                            <div className="mb-2 text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">4 gal</div>
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '20px' }} // 4x AI
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="w-full bg-purple-500 rounded-t-lg relative"
                            >
                                <div className="absolute -top-8 w-full text-center font-bold">TV</div>
                            </motion.div>
                        </div>

                        {/* 660 Gallons (Burger) - We will scale this logarithmically or break the chart visually because 660 is huge compared to 1 */}
                        <div className="flex flex-col items-center w-1/3 group">
                            <div className="mb-2 text-xs text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity">~660 gal</div>
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }} // Full height
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.6 }}
                                className="w-full bg-orange-500 rounded-t-lg relative overflow-hidden"
                            >
                                <div className="absolute -top-8 w-full text-center font-bold">Food</div>
                                <div className="absolute top-0 w-full h-full bg-orange-400/20 animate-pulse" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
