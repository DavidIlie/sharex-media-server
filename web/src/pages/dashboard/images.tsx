import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import { Fade } from "react-awesome-reveal";

import type { FileType } from "@sharex-server/common";
import useEnv from "@hooks/useEnv";

import NavBar from "@components/NavBar";
import LargePreviewListPane from "@components/LargePreviewListPane";
import { isLoggedIn } from "@lib/isLoggedIn";

const Images = (): JSX.Element => {
    const env = useEnv();
    const { data, isLoading } = useQuery<FileType[]>(
        `${env.api_url}/api/latest/images/no-limit`
    );

    if (isLoading) return <div />;

    return (
        <>
            <NextSeo title="Images" />
            <div className="mb-12">
                <NavBar />
                <div className="pt-12" />
                <Fade direction="up" triggerOnce>
                    <LargePreviewListPane type="image" data={data} />
                </Fade>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    await isLoggedIn(req, res);
    return {
        props: {},
    };
};

export default Images;
