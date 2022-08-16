import logo from '../../images/logo.png';

const Navbar = () => {
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-50 logo" cursor pointer></img>
            </div>
        </nav>
    );
}

export default Navbar;