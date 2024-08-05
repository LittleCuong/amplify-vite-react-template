import Header from '../component/Header';

// Icon
import laptopIcon from '../assets/main-svg/laptop.svg';
import vgaIcon from '../assets/main-svg/vga.svg';
import cpuIcon from '../assets/main-svg/cpu.svg';
import mainboardIcon from '../assets/main-svg/mainboard.svg';
import ramIcon from '../assets/main-svg/ram.svg';
import hardDriveIcon from '../assets/main-svg/hard-drive.svg';
import psuIcon from '../assets/main-svg/psu.svg';
import monitorIcon from '../assets/main-svg/monitor.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import appAPI from '../service/api';

function HomePageLayout() {
    const [monitors, setMonitors] = useState([]);

    useEffect(() => {
        getMonitors();
    }, []);

    const getMonitors = async () => {
        let response = null;
        try {
            response = await appAPI.getBasicMonitors();
            setMonitors(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <section className="px-12">
                <div
                    style={{
                        backgroundImage:
                            'url(https://fullkit.moxcreative.com/electrodeals/wp-content/uploads/sites/8/2022/06/bg_white.jpg)',
                    }}
                    className="min-h-80 py-4  flex items-center"
                >
                    <div className="flex items-center gap-4">
                        {/* Sidebar */}
                        <div className="p-6 shadow-md rounded-md bg-white">
                            <h3 className="text-center text-lg font-semibold uppercase">Danh mục - Category</h3>
                            <ul className="mt-2 min-w-5">
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={laptopIcon} />
                                    <p className="font-medium">Laptop</p>
                                </li>
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={vgaIcon} />
                                    <p className="font-medium">Card đồ họa - VGA</p>
                                </li>
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={cpuIcon} />
                                    <p className="font-medium">Vi xử lý - CPU</p>
                                </li>
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={mainboardIcon} />
                                    <p className="font-medium">Bo mạch chủ - Mainboard</p>
                                </li>
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={ramIcon} />
                                    <p className="font-medium">RAM</p>
                                </li>
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={hardDriveIcon} />
                                    <p className="font-medium">Ổ cứng - Hard drive</p>
                                </li>
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={psuIcon} />
                                    <p className="font-medium">Nguồn máy tính - PSU</p>
                                </li>
                                <li className="flex my-2 items-center gap-2 hover:text-red-600 transition-all duration-300 cursor-pointer">
                                    <img className="w-6 h-6" src={monitorIcon} />
                                    <p className="font-medium">Màn hình</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-12 gap-2">
                        {monitors?.map((item, index) => (
                            <div className="col-span-3">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes"
                                />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-base font-medium">{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <h3>Footer</h3>
        </>
    );
}

export default HomePageLayout;
