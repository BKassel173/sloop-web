import Hero from "@/components/site/Hero";
import PopularSection from "@/components/home/PopularSection";
import NewSection from "@/components/home/NewSection";
import { getCollectionProducts, getNewestProducts } from "@/lib/shopify";
import { COLLECTION_HANDLES } from "@/lib/collections";

export default async function Home() {
  // fetch data server-side
  const [popular, newest] = await Promise.all([
    getCollectionProducts(COLLECTION_HANDLES.popular, 4),
    getNewestProducts(4),
  ]);

  return (
    <main>
      <Hero />

      <div id="popular">
        <PopularSection
          title="Popular"
          products={popular}
          viewAllHref={`/collections/${COLLECTION_HANDLES.topProducts}`}
        />
      </div>

      <div id="new">
        <NewSection
          title="New"
          products={newest}
          viewAllHref={`/collections/${COLLECTION_HANDLES.newProducts}`}
        />
      </div>
    </main>
  );
}
