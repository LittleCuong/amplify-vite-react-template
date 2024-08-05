import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="flex items-center justify-between h-16 px-12 bg-[#E74C3C]">
            <div className="flex items-center gap-12">
                <Link to={'/'}>
                    <span className="text-white text-lg font-medium">Home</span>
                </Link>
                <Link to={'/about-us'}>
                    <span className="text-white text-lg font-medium">About Us</span>
                </Link>
                <div>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="bg-transparent text-white text-lg font-medium">
                            Pages
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-0 shadow overflow-hidden"
                        >
                            <li className="">
                                <a className="rounded-none text-base font-semibold">VGA - Card đồ họa</a>
                            </li>
                            <li className="">
                                <a className="rounded-none text-base font-semibold">Monitor - Màn hình</a>
                            </li>
                            <li className="">
                                <a className="rounded-none text-base font-semibold">Laptop</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Link to={'/profile'}>
                    <span className="text-white text-lg font-medium">Profile</span>
                </Link>
                <Link to={'/cart'}>
                    <span className="text-white text-lg font-medium">Cart</span>
                </Link>
            </div>
        </div>
    );
}

export default Header;
