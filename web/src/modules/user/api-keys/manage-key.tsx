import { useQuery } from "react-query";

import APIKeyCard from "@components/APIKeyCard";

import useEnv from "@hooks/useEnv";
import type { TokenProps } from "../../../types/Token";

import SettingSection from "@components/SettingSection";
import TopPart from "@components/SettingSection/TopPart";

const ManageKeysModule = (): JSX.Element => {
    const env = useEnv();

    const { isLoading, data } = useQuery<TokenProps[]>(
        `${env.api_url}/api/keys`
    );

    return (
        <SettingSection
            title="Manage API Keys"
            subtitle="You may delete any of your existing tokens if they are no longer needed."
        >
            <TopPart noGrid noBottom>
                {!isLoading &&
                    (data?.length === 0 ? (
                        <h1>You don't have any API Tokens right now.</h1>
                    ) : (
                        data?.map((key, index) => {
                            return (
                                <div
                                    className={`${
                                        index !== data?.length - 1 && "mb-6"
                                    }`}
                                >
                                    <APIKeyCard data={key} key={index} />
                                </div>
                            );
                        })
                    ))}
            </TopPart>
        </SettingSection>
    );
};

export default ManageKeysModule;
