import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/site.config";
import { generalEnquiry, waLink } from "@/lib/whatsapp";
import { MountainLine } from "@/components/MountainLine";
import { WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Our story",
  description: `How ${site.founder} and the women of Sanet make pickles and sharbats by hand, one season at a time.`,
};

const values = [
  { hi: "अपनापन", en: "Apnapan · belonging", text: "We talk to you like family, because that's how this started." },
  { hi: "ईमानदारी", en: "Imaandari · honesty", text: "Real photos, real prices in rupees. We say what's in the jar and stop there." },
  { hi: "पहाड़ी", en: "Pahadi · of the hills", text: "Galgal, lingad, lasoda, buransh, chukh. Our ingredients are the story." },
];

const year = [
  { when: "Spring", what: "Buransh flowers are picked straight off the trees for sharbat." },
  { when: "Early summer", what: "Lasoda, for just a few weeks. Then raw mangoes." },
  { when: "Monsoon", what: "Lingad (fiddlehead fern) is foraged from the damp hillsides." },
  { when: "Winter", what: "Galgal goes out on the rooftop to sun-dry and slowly age." },
];

export default function OurStory() {
  return (
    <>
      <section className="section">
        <div className="wrap story-hero">
          <div className="stack">
            <p className="eyebrow">Our story</p>
            <h1 className="page-title">Started as one woman&apos;s dream. Made by many hands.</h1>
            <p className="lede">
              {site.company} was started by {site.founder} to share the pickles and sharbats of Himachal with homes beyond the hills.
            </p>
            <p>
              Along the way it became something bigger: a way for women in Sanet, District Solan, to learn, earn and stand on their own feet. They cut, sun-dry, mix and fill every jar by hand, in small batches, the way it&apos;s always been done at home.
            </p>
            <p className="note">You&apos;re not buying from a factory. You&apos;re buying from us. ✿</p>
          </div>
          <figure className="polaroid">
            <Image src="/images/story/buransh-flower-picking-2.webp" alt="Picking buransh flowers from a tall tree" width={900} height={1200} priority sizes="(max-width: 860px) 80vw, 380px" />
            <figcaption>Climbing for buransh, every spring</figcaption>
          </figure>
        </div>
      </section>

      <MountainLine />

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">A day in the kitchen</p>
          <h2>Real hands, real jars, real daylight</h2>
          <div className="gallery">
            <figure>
              <Image src="/images/story/hand-cutting-pickle-masala.webp" alt="Masala mixed by hand and filled into jars" width={1200} height={900} sizes="(max-width: 860px) 100vw, 640px" />
              <figcaption>Masala mixed by hand, jar by jar</figcaption>
            </figure>
            <figure>
              <Image src="/images/story/cleaning-pahadi-karela.webp" alt="Sorting and cleaning pahadi karela" width={1200} height={900} sizes="(max-width: 860px) 100vw, 320px" />
              <figcaption>Sorting pahadi karela</figcaption>
            </figure>
            <figure>
              <Image src="/images/story/filling-sharbat-bottles.webp" alt="Filling sharbat bottles" width={1200} height={900} sizes="(max-width: 860px) 100vw, 320px" />
              <figcaption>Filling sharbat, one bottle at a time</figcaption>
            </figure>
            <figure>
              <Image src="/images/story/kitchen-steel-vessels.webp" alt="Steel vessels in the kitchen" width={750} height={1000} sizes="(max-width: 860px) 100vw, 320px" />
              <figcaption>The big steel patilas</figcaption>
            </figure>
            <figure>
              <Image src="/images/story/stall-zila-udyog-1.webp" alt="RSFP stall at a Zila Udyog fair" width={1000} height={750} sizes="(max-width: 860px) 100vw, 320px" />
              <figcaption>Meeting people at the Zila Udyog mela</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="band section">
        <div className="wrap">
          <p className="eyebrow">What we care about</p>
          <h2>Three words we live by</h2>
          <div className="values">
            {values.map((v) => (
              <div key={v.hi} className="value">
                <p className="value-hi" lang="hi">{v.hi}</p>
                <p className="value-en">{v.en}</p>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">The pahadi year</p>
          <h2>Everything has its season</h2>
          <ol className="year">
            {year.map((y) => (
              <li key={y.when}>
                <strong>{y.when}</strong>
                <span>{y.what}</span>
              </li>
            ))}
          </ol>
          <p className="note">When it&apos;s gone, it&apos;s gone until next year.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap center stack">
          <h2>Meet the makers</h2>
          <p className="lede">
            Photos of each of us with the pickle we&apos;re best at are coming soon. Until then, the quickest way to meet us is to say hello.
          </p>
          <p className="actions-center">
            <a href={waLink(generalEnquiry())} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Say namaste on WhatsApp
            </a>
            <Link href="/shop" className="btn btn-ghost">Browse the shelf</Link>
          </p>
        </div>
      </section>
    </>
  );
}
