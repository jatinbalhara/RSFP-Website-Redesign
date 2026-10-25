import Image from "next/image";
import Link from "next/link";
import { site } from "@/site.config";
import { categories, getProducts } from "@/lib/products";
import { inSeason } from "@/lib/seasons";
import { generalEnquiry, waLink } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ProductCard";
import { MountainLine } from "@/components/MountainLine";
import { WhatsAppIcon } from "@/components/Icons";

// Rebuild once a day so the seasonal shelf follows the calendar.
export const revalidate = 86400;

const categoryImages: Record<string, string> = {
  pickles: "/images/products/galgal-pickle-600.webp",
  sharbat: "/images/products/buransh-sharbat-600.webp",
  sweets: "/images/products/mixed-fruit-jam-600.webp",
};

export default async function Home() {
  const products = await getProducts();
  const month = Number(new Intl.DateTimeFormat("en-IN", { month: "numeric", timeZone: "Asia/Kolkata" }).format(new Date()));
  const seasonal = inSeason(month).flatMap((s) => {
    const p = products.find((x) => x.slug === s.slug);
    return p ? [{ p, note: s.note as string }] : [];
  });
  const picks = ["galgal-pickle", "green-chukh", "lingad-pickle", "garlic-pickle", "amla-pickle", "rose-squash", "lemon-pickle", "mushroom-pickle", "buransh-sharbat", "lasoda-pickle"]
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .filter((p) => !seasonal.some((s) => s.p.slug === p.slug));
  // Top the seasonal shelf up to a full row with always-available favourites.
  const fillers = picks.slice(0, Math.max(0, 4 - seasonal.length));
  const favourites = picks.slice(fillers.length, fillers.length + 4);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Neelam bua&apos;s kitchen · Sanet, Himachal</p>
            <h1 lang="hi">
              घर का स्वाद,
              <br />
              पहाड़ों से।
            </h1>
            <p className="hero-en">The taste of home, from the hills.</p>
            <p className="lede">
              Galgal sun-dried on the rooftop, lingad picked in the monsoon, buransh flowers off the trees in spring. Every jar is filled by hand by {site.founderShort} and the women of Sanet.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-primary">Browse the pickles</Link>
              <a href={waLink(generalEnquiry())} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Ask {site.founderShort} on WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-photos">
            <figure className="polaroid polaroid-a">
              <Image src="/images/story/buransh-flower-picking-1.webp" alt="Climbing a buransh tree to pick the red flowers" width={900} height={1200} priority sizes="(max-width: 860px) 60vw, 340px" />
              <figcaption>Buransh season. Picked by hand, straight off the tree.</figcaption>
            </figure>
            <figure className="polaroid polaroid-b">
              <Image src="/images/products/galgal-pickle-600.webp" alt="A jar of Galgal pickle" width={600} height={600} sizes="200px" />
              <figcaption>This winter&apos;s galgal ✿</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <MountainLine />

      {seasonal.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">What&apos;s in season</p>
                <h2>Fresh on the shelf right now</h2>
              </div>
              <p className="note">When it&apos;s gone, it&apos;s gone till next year!</p>
            </div>
            <div className="grid-cards">
              {seasonal.map(({ p, note }) => (
                <ProductCard key={p.slug} p={p} note={note} />
              ))}
              {fillers.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">The shelf</p>
              <h2>What&apos;s in the kitchen</h2>
            </div>
          </div>
          <div className="cat-grid">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop?c=${c.slug}`} className="cat">
                <Image src={categoryImages[c.slug]} alt="" width={600} height={600} sizes="(max-width: 640px) 40vw, 200px" />
                <span className="cat-text">
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-blurb">{c.blurb}</span>
                  <span className="cat-count">{products.filter((p) => p.category === c.name).length} kinds →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band section">
        <div className="wrap story-teaser">
          <div className="stack">
            <p className="eyebrow">Our story</p>
            <h2>Started as one woman&apos;s dream. Made by many hands.</h2>
            <p>
              {site.founder} started {site.company} to share the pickles and sharbats of Himachal with homes beyond the hills. Along the way it became a way for the women of Sanet to learn, earn and stand on their own feet.
            </p>
            <p className="note">When you buy a jar, you&apos;re helping someone you know. ✿</p>
            <p>
              <Link href="/our-story" className="btn btn-paper">Meet the makers</Link>
            </p>
          </div>
          <div className="story-photos">
            <Image src="/images/story/hand-cutting-pickle-masala.webp" alt="Mixing pickle masala by hand and filling jars" width={1200} height={900} sizes="(max-width: 860px) 90vw, 480px" />
            <Image src="/images/story/cleaning-pahadi-karela.webp" alt="Sorting and cleaning pahadi karela" width={1200} height={900} sizes="(max-width: 860px) 45vw, 230px" />
            <Image src="/images/story/filling-sharbat-bottles.webp" alt="Filling sharbat bottles one at a time" width={1200} height={900} sizes="(max-width: 860px) 45vw, 230px" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Family favourites</p>
              <h2>The jars people ask for again</h2>
            </div>
            <Link href="/shop" className="link-arrow">See all {products.length} →</Link>
          </div>
          <div className="grid-cards">
            {favourites.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <p className="eyebrow">How ordering works</p>
          <h2>As easy as messaging family</h2>
          <ol className="steps">
            <li>
              <span className="step-n">1</span>
              <h3>Fill your basket</h3>
              <p>Pick the jars you like. Not sure? Ask {site.founderShort} which one suits you.</p>
            </li>
            <li>
              <span className="step-n">2</span>
              <h3>Send it on WhatsApp</h3>
              <p>Your basket turns into a WhatsApp message. {site.founderShort} confirms the delivery charge and how to pay.</p>
            </li>
            <li>
              <span className="step-n">3</span>
              <h3>We pack it by hand</h3>
              <p>{site.ordering.dispatchTime}. Wrapped carefully, the way bua would send it.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
