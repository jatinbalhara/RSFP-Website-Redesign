import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { productEnquiry, waLink } from "@/lib/whatsapp";
import { AddToBasket } from "./AddToBasket";
import { Price } from "./Price";
import { WhatsAppIcon } from "./Icons";

export function ProductCard({ p, note }: { p: Product; note?: string }) {
  return (
    <article className="card">
      <Link href={`/shop/${p.slug}`} className="card-img">
        <Image src={p.image} alt={`${p.name} jar`} width={600} height={600} sizes="(max-width: 640px) 50vw, 280px" />
        {note && <span className="card-badge">In season</span>}
      </Link>
      <div className="card-body">
        <h3 className="card-title">
          <Link href={`/shop/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="card-hi" lang="hi">{p.nameHi}</p>
        <p className="card-taste">{note ?? p.taste}</p>
        <div className="card-foot">
          <Price p={p} />
          <div className="card-actions">
            <AddToBasket slug={p.slug} compact />
            <a className="btn-icon" href={waLink(productEnquiry(p.name))} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${p.name} on WhatsApp`}>
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
