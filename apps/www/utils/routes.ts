export const primitivesRoutes = [
  {
    label: "Overview",
    pages: [
      { title: "Introduction", slug: "docs/primitives/overview/introduction" },
      {
        title: "Getting started",
        slug: "docs/primitives/overview/getting-started",
      },
    ],
  },
  {
    label: "Components",
    pages: [
      {
        title: "Avatar",
        slug: "docs/primitives/components/avatar",
        newBadge: true,
      },
      { title: "Badge", slug: "docs/primitives/components/badge" },
      {
        title: "Breadcrumb",
        slug: "docs/primitives/components/breadcrumb",
        newBadge: true,
      },
      {
        title: "Button",
        slug: "docs/primitives/components/button",
        newBadge: true,
      },
      { title: "Calendar", slug: "docs/primitives/components/calendar" },
      { title: "Command", slug: "docs/primitives/components/command" },
      { title: "Checkbox", slug: "docs/primitives/components/checkbox", newBadge: true },
      { title: "Container", slug: "docs/primitives/components/container" },
      { title: "Datatable", slug: "docs/primitives/components/datatable" },
      { title: "Dialog", slug: "docs/primitives/components/dialog" },
      {
        title: "Dropdown Menu",
        slug: "docs/primitives/components/dropdownmenu",
        newBadge: true,
      },
      {
        title: "Empty State",
        slug: "docs/primitives/components/emptystate",
        newBadge: true,
      },
      { title: "ErrorState", slug: "docs/primitives/components/errorstate" },
      {
        title: "Flex",
        slug: "docs/primitives/components/flex",
        newBadge: true,
      },
      { title: "Headline", slug: "docs/primitives/components/headline" },
      { title: "Image", slug: "docs/primitives/components/image" },
      {
        title: "Input Field",
        slug: "docs/primitives/components/inputField",
        newBadge: true,
      },
      { title: "Label", slug: "docs/primitives/components/label" },
      { title: "Link", slug: "docs/primitives/components/link" },
      { title: "Popover", slug: "docs/primitives/components/popover" },
      { title: "Radio", slug: "docs/primitives/components/radio" },
      { title: "Select", slug: "docs/primitives/components/select" },
      { title: "Separator", slug: "docs/primitives/components/separator" },
      { title: "Sheet", slug: "docs/primitives/components/sheet" },
      {
        title: "Spinner",
        slug: "docs/primitives/components/spinner",
        newBadge: true,
      },
      { title: "Switch", slug: "docs/primitives/components/switch" },
      { title: "Tabs", slug: "docs/primitives/components/tabs" },
      { title: "Table", slug: "docs/primitives/components/table" },
      {
        title: "Text",
        slug: "docs/primitives/components/text",
        newBadge: true,
      },
      { title: "Text Field", slug: "docs/primitives/components/textfield" },
      { title: "Tooltip", slug: "docs/primitives/components/tooltip" },
      { title: "Toggle Group", slug: "docs/primitives/components/togglegroup" },
      {
        title: "Toast",
        slug: "docs/primitives/components/toast",
        newBadge: true,
      },
    ],
  },
];

export type PageProps = {
  title: string;
  slug: string;
  deprecated?: boolean;
  preview?: boolean;
  newBadge?: boolean;
};

export type RouteProps = {
  label: string;
  pages: PageProps[];
};

export const allPrimitivesRoutes = primitivesRoutes.reduce(
  (acc: any, curr: RouteProps) => {
    return [...acc, ...curr.pages];
  },
  []
);
