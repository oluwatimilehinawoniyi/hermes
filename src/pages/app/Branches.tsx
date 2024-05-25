import DynamicPage, {
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";

export default function Branches() {
  return (
    <DynamicPage title="branches">
      <DynamicTable />
    </DynamicPage>
  );
}
