import { useState } from "react";
import { useRouter } from "next/router";

import useSettings from "@hooks/useSettings";
import useUser from "@hooks/useUser";

import NavLink from "./NavLink";
import UserDropdown from "./UserDropdown";

const NavBar = (): JSX.Element => {
    const [clickMobileMenu, setClickMobileMenu] = useState<boolean>(false);
    const router = useRouter();

    const settings = useSettings();

    const { isLoading, user } = useUser();

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-900 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <a
                                className="font-medium text-black dark:text-gray-100"
                                href={router.asPath}
                            >
                                {settings.name}
                            </a>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink name="Dashboard" link="/dashboard" />
                            <NavLink name="Images" link="/dashboard/images" />
                            <NavLink name="Files" link="/dashboard/files" />
                            <NavLink name="Texts" link="/dashboard/texts" />
                            <NavLink
                                name="Control Panel"
                                link="/dashboard/control-panel"
                            />
                        </div>
                    </div>
                    {!isLoading && <UserDropdown user={user!} />}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="bg-gray-200 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700 duration-200"
                            onClick={() => {
                                setClickMobileMenu(!clickMobileMenu);
                            }}
                        >
                            {clickMobileMenu ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={
                    clickMobileMenu ? "sm:hidden block" : "sm:hidden hidden"
                }
            >
                <div className="pb-2 space-y-1">
                    <NavLink name="Dashboard" link="/dashboard" />
                    <NavLink name="Images" link="/dashboard/images" />
                    <NavLink name="Files" link="/dashboard/files" />
                    <NavLink name="Texts" link="/dashboard/texts" />
                    <NavLink
                        name="Control Panel"
                        link="/dashboard/control-panel"
                    />
                    <NavLink
                        name="Report a bug"
                        link="https://github.com/DavidIlie/sharex-media-server/issues"
                    />
                </div>
                <div className="pt-2 pb-1 border-t border-gray-200">
                    <div className="flex items-center px-4">
                        {!isLoading && (
                            <div>
                                <div className="font-medium text-base text-gray-800 dark:text-gray-300">
                                    {user!.name}
                                </div>
                                <div className="font-medium text-sm text-gray-400">
                                    {user!.email}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 space-y-1">
                        <NavLink name="Profile" link="/user/profile" />
                        <NavLink name="API Keys" link="/user/api-keys" />
                        <NavLink name="Log Out" link="/logout" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
