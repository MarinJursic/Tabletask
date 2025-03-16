import { useMemo } from "react";
import NameColumn from "@/components/dashboard/content/NameColumn";
import { TrendsItem, ContentItem } from "../utils/validation";

const useTableConfig = (selectedView: string) => {
  return useMemo(() => {
    if (selectedView === "content") {
      return [
        {
          id: "name",
          label: "Name",
          render: (item: ContentItem) => NameColumn(item),
        },
      ];
    } else {
      return [
        { id: "date", label: "Date", render: (item: TrendsItem) => item.date },
        { id: "name", label: "Name", render: (item: TrendsItem) => item.name },
        {
          id: "description",
          label: "Description",
          render: (item: TrendsItem) => item.description,
        },
      ];
    }
  }, [selectedView]);
};

export default useTableConfig;
