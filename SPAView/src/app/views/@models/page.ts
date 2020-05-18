export interface Page {
  id: number;
  title: string;
  menuId: number;
}

export interface PageContent {
  id: number;
  title: string;
  pageId: number;
  page: string;
  passage: string;
  imageUrl: string;
}
