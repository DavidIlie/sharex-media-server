import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";
import Link from "next/link";

import NotFound from "@components/NotFound";
import FileCard from "@components/FileCard/FileCard";
import { getFileIconFromExtension } from "@lib/iconUtils";

import { FileType, SettingsType, SupportPreview } from "@sharex-server/common";

interface Props {
    message?: string;
    file: FileType;
    env: {
        api_url: string;
        app_url: string;
    };
    settings: SettingsType;
}

const ViewFile = ({ message, file, env, settings }: Props): JSX.Element => {
    const router = useRouter();
    const { slug } = router.query;

    if (message) return <NotFound />;

    const icon = getFileIconFromExtension(file.stats.extension);

    return (
        <>
            <NextSeo
                title={file.name}
                canonical={`${env.app_url}/${router.asPath}`}
                description={`${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`}
                openGraph={{
                    title: file.name,
                    site_name: settings.name,
                    description: `${file.name} - ${file.stats.size} - MD5: ${file.stats.md5}`,
                    url: `${env.app_url}/${router.asPath}`,
                    type: "website",
                    images: [
                        {
                            url: `/file-icons/${icon}.svg`,
                        },
                    ],
                }}
            />
            <div className="h-screen flex items-center justify-center text-gray-50">
                <Fade direction="down">
                    <div>
                        <FileCard
                            file={file}
                            icon={`/file-icons/${icon}.svg`}
                        />
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="pt-6 flex justify-center">
                                <a
                                    href={`${env.api_url}/dl/${slug}`}
                                    className="px-4 py-2 text-lg bg-indigo-600 hover:bg-indigo-700 duration-150 rounded shadow"
                                >
                                    Download
                                </a>
                            </div>
                            {SupportPreview(file.stats.extension) && (
                                <div className="sm:pt-6 flex justify-center">
                                    <Link href={`/f/${slug}/preview`}>
                                        <a className="px-4 py-2 text-lg bg-gray-600 hover:bg-gray-700 duration-150 rounded shadow">
                                            Preview
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Fade>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = await fetch(`${process.env.API_URL}/api/file/${params?.slug}`);
    const response = await data.json();

    if (response.message) {
        return { props: { message: response.message } };
    } else {
        return {
            props: {
                file: response,
                env: {
                    api_url: process.env.API_URL,
                    app_url: process.env.APP_URL,
                },
            },
        };
    }
};

export default ViewFile;