import { styled, Tabs } from "@raystack/apsara";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const DynamicLive = dynamic(() => import("./live"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        padding: "32px 16px",
        fontSize: "12px",
        borderRadius: "6px",
        border: "1px solid #ededed",
      }}
    >
      loading...
    </div>
  ),
});

export type Tab = {
  name: string;
  code: string;
};

export type PlaygroundProps = {
  title?: React.ReactNode | string;
  desc?: React.ReactNode | string;
  code: string;
  tabs: Tab[];
  scope: {
    [key: string]: any;
  };
};

const defaultProps = {
  code: "",
  tabs: [] as Tab[],
  scope: {},
};

const StyledPlayground = styled("div", {
  borderRadius: "$2",
  border: "1px solid $gray4",
});

const Playground: React.FC<PlaygroundProps> = React.memo(
  ({ code, tabs, scope }: PlaygroundProps & typeof defaultProps) => {
    const [visible, setVisible] = useState(false);

    if (code) {
      return (
        <StyledPlayground>
          <DynamicLive
            code={code}
            scope={scope}
            visible={visible}
            setVisible={setVisible}
          />
        </StyledPlayground>
      );
    }
    return (
      <StyledPlayground>
        <Tabs defaultValue={tabs[0]?.name}>
          <Tabs.List
            css={{
              background: "transparent",
              padding: "$4",
              gap: "$3",
              borderBottom: "1px solid $gray4",
            }}
          >
            {tabs.map((tab) => (
              <Tabs.Trigger value={tab.name} key={tab.name}>
                {tab.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Content value={tab.name} key={tab.name}>
              <DynamicLive
                code={tab.code}
                scope={scope}
                visible={visible}
                setVisible={setVisible}
              />
            </Tabs.Content>
          ))}
        </Tabs>
      </StyledPlayground>
    );
  }
);

Playground.defaultProps = defaultProps;
Playground.displayName = "Playground";
export default Playground;
