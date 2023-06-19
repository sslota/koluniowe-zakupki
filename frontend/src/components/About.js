import React from "react";
import { Link } from "react-router-dom";

function About() {
    const Team = [
        { id: 1, name: "Dominik Grzesik", github: "https://github.com/DGrzesik", photo: "gamer", role:"Fullstack" },
        { id: 2, name: "Marcin Mikuła", github: "https://github.com/mamikula", photo: "cowboy", role:"Backend" },
        { id: 3, name: "Jakub Strojewski", github: "https://github.com/strjakub", photo: "man", role:"Backend" },
        { id: 4, name: "Sebastian Kozak", github: "https://github.com/sekozak", photo: "bodybuilder", role:"Backend" },
        { id: 5, name: "Szymon Słota", github: "https://github.com/sslota", photo: "fat", role:"Fullstack" },
    ];

    return (
        <section className="py-6 text-gray-600 cursor-default">
            <div className="sm:max-w-screen-sm md:max-w-3xl lg:max-w-5xl xl:max-w-7xl w-full flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
                <p className="p-2 text-sm font-medium text-center uppercase">Development team</p>
                <h1 className="text-4xl font-bold text-center sm:text-5xl">The talented people behind the scenes</h1>
                <div className="flex flex-row flex-wrap justify-center mt-8">
                    {Team.map((team) => (
                        <div key={team.id} className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gray-100 text-gray-800">
                            <img alt="profile" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500" src={`https://source.unsplash.com/100x100/?${team.photo}?0`} />
                            <div className="flex-1 my-4">
                                <p className="text-xl font-semibold">{team.name}</p>
                                <p>{team.role}</p>
                            </div>
                            <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                                <Link to={team.github} title="GitHub" className="text-gray-900 hover:text-indigo-600 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default About;
