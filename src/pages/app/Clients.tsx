import DynamicPage, {
  DynamicTable,
} from "@components/layouts/Dashboard/DynamicPageLayout/DynamicPage";

export default function Clients() {
  return (
    <DynamicPage title="clients">
      <DynamicTable />
    </DynamicPage>
  );
}
