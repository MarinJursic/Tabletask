import { z } from "zod";
import {
  ContentItemSchema,
  TrendsItemSchema,
  PaginationMeta,
  PaginationMetaSchema,
} from "../utils/validation";
import { TableType } from "../utils/validation";
import { extractValidUrl } from "@/utils/extractUrl";

export interface FetchDataParams {
  type: string;
  searchTerm?: string;
  page: number;
  perPage: number;
}

// 🔹 Helper Function to Format Date "retrievalDate" → "04.03.2025."
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE").replace(/\//g, ".") + ".";
};

const API_BASE_URL =
  "https://app-backend-staging-westeu-002.azurewebsites.net/api";
const API_VERSION = "2.0"; // xApiVersion

const getEndpoint = (type: string) => {
  switch (type) {
    case "content":
      return `${API_BASE_URL}/productboard`;
    case "trends":
      return `${API_BASE_URL}/article`;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

// 🔹 Validate API Response and Ensure `{ items, meta }`
const validateResponse = (
  type: string,
  data: unknown
): { items: TableType[]; meta: PaginationMeta } => {
  const validatedMeta = PaginationMetaSchema.parse(data.meta);

  let items: TableType[] = [];
  if (type === "content") {
    items = z.array(ContentItemSchema).parse(
      data.items.map((item: unknown) => ({
        id: String(item.code),
        name: item.name,
        avatarUrl: item.user?.avatar?.url || "",
      }))
    );
  } else if (type === "trends") {
    items = z.array(TrendsItemSchema).parse(
      data.items.map((item: unknown) => ({
        id: String(item.idArticle),
        name: item.title, // Map "title" to "name"
        date: formatDate(item.retrievalDate), // Format retrievalDate
        description: item.summary || "No description available",
        url: extractValidUrl(item.url), // Ensure URL exists
      }))
    );
  }

  return { items, meta: validatedMeta };
};

// 🔹 Fetch Data and Validate Response
export const fetchData = async ({
  type,
  searchTerm,
  page,
  perPage,
}: FetchDataParams) => {
  const endpoint = getEndpoint(type);
  const url = `${endpoint}?page=${page}&perPage=${perPage}&searchTerm=${
    searchTerm || ""
  }&xApiVersion=${API_VERSION}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonData = await response.json();
  return validateResponse(type, jsonData);
};
