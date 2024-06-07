import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell,faEnvelope,faQuestionCircle  } from '@fortawesome/free-regular-svg-icons';

export function NavBar() {
    return (
        <div className="flex justify-around items-center p-4 border-y-2">
            <div className="flex items-center space-x-8">
                <h2 className="text-xl font-bold">Xype</h2>
                <div className="flex space-x-6">
                    <h3 className="hover:bg-gray-100 p-2 cursor-pointer rounded text-sm font-semibold text-gray-600">Dashboard</h3>
                    <h3 className="hover:bg-gray-100 p-2 cursor-pointer rounded text-sm font-semibold text-gray-600">My Business</h3>
                    <h3 className="hover:bg-gray-100 p-2 cursor-pointer rounded text-sm font-semibold text-gray-600">Growth & Marketing</h3>
                    <h3 className="hover:bg-gray-100 p-2 cursor-pointer rounded text-sm font-semibold text-gray-600">Analytics</h3>
                </div>
            </div>
            <div className="flex items-center space-x-1">
                <div className="hover:bg-gray-100 p-2 cursor-pointer rounded text-base font-semibold text-gray-600"><FontAwesomeIcon icon={farBell} /></div>
                <div className="hover:bg-gray-100 p-2 cursor-pointer rounded text-base font-semibold text-gray-500"><FontAwesomeIcon icon={faEnvelope } /></div>
                <div className="hover:bg-gray-100 p-2 cursor-pointer rounded text-base font-semibold text-gray-600"><FontAwesomeIcon icon={faQuestionCircle}/></div>
                <div className="hover:bg-gray-100 p-2 cursor-pointer rounded text-base font-semibold text-black-500 border-2 border-gray-950 h-3.5 flex items-center">$16</div>
            </div>
        </div>
    );
}
