// ──────────────────────────────────────────────────────────────
// Jewellery Store — Prisma Seed Script
// Seeds realistic Indian jewellery data for development
// ──────────────────────────────────────────────────────────────

import { PrismaClient, MetalType, Karat, StoneType, Gender, CouponType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Jewellery Store database...\n");

  await prisma.$transaction(async (tx) => {
    // ═══════════════════════════════════════════════════════
    // 1. USERS
    // ═══════════════════════════════════════════════════════
    console.log("👤 Creating users...");

    const adminUser = await tx.user.create({
      data: {
        name: "Rajesh Mehta",
        email: "admin@jewellerystore.in",
        phone: "+919876543210",
        role: "ADMIN",
        emailVerified: new Date(),
        image: "/avatars/admin.jpg",
      },
    });

    const managerUser = await tx.user.create({
      data: {
        name: "Priya Sharma",
        email: "manager@jewellerystore.in",
        phone: "+919876543211",
        role: "MANAGER",
        emailVerified: new Date(),
        image: "/avatars/manager.jpg",
      },
    });

    const regularUser = await tx.user.create({
      data: {
        name: "Ananya Gupta",
        email: "ananya@example.com",
        phone: "+919876543212",
        role: "USER",
        emailVerified: new Date(),
        image: "/avatars/user.jpg",
      },
    });

    // Create addresses for regular user
    await tx.address.createMany({
      data: [
        {
          userId: regularUser.id,
          label: "Home",
          line1: "42, Shanti Nagar",
          line2: "Near Lakshmi Temple",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          phone: "+919876543212",
          isDefault: true,
        },
        {
          userId: regularUser.id,
          label: "Office",
          line1: "Tower B, 15th Floor, BKC",
          line2: "Bandra Kurla Complex",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400051",
          phone: "+919876543212",
          isDefault: false,
        },
      ],
    });

    console.log(`   ✓ Created ${3} users with addresses`);

    // ═══════════════════════════════════════════════════════
    // 2. CATEGORIES
    // ═══════════════════════════════════════════════════════
    console.log("📂 Creating categories...");

    const parentCategories = await Promise.all([
      tx.category.create({
        data: {
          name: "Rings",
          slug: "rings",
          description: "Exquisite rings for every occasion — from engagement solitaires to everyday bands.",
          image: "/categories/rings.jpg",
        },
      }),
      tx.category.create({
        data: {
          name: "Necklaces",
          slug: "necklaces",
          description: "Stunning necklaces that elevate any ensemble, from chokers to long chains.",
          image: "/categories/necklaces.jpg",
        },
      }),
      tx.category.create({
        data: {
          name: "Earrings",
          slug: "earrings",
          description: "Elegant earrings — jhumkas, studs, hoops, and drops crafted in gold and diamonds.",
          image: "/categories/earrings.jpg",
        },
      }),
      tx.category.create({
        data: {
          name: "Bracelets",
          slug: "bracelets",
          description: "Graceful bracelets in gold, diamond, and platinum for men and women.",
          image: "/categories/bracelets.jpg",
        },
      }),
      tx.category.create({
        data: {
          name: "Bangles",
          slug: "bangles",
          description: "Traditional and contemporary bangles — kadhas, kundan sets, and diamond bangles.",
          image: "/categories/bangles.jpg",
        },
      }),
      tx.category.create({
        data: {
          name: "Pendants",
          slug: "pendants",
          description: "Delicate pendants featuring diamonds, gemstones, and intricate gold work.",
          image: "/categories/pendants.jpg",
        },
      }),
      tx.category.create({
        data: {
          name: "Chains",
          slug: "chains",
          description: "Gold and platinum chains — rope, box, curb, and designer styles.",
          image: "/categories/chains.jpg",
        },
      }),
      tx.category.create({
        data: {
          name: "Anklets",
          slug: "anklets",
          description: "Silver and gold anklets with traditional Indian craftsmanship.",
          image: "/categories/anklets.jpg",
        },
      }),
    ]);

    const [rings, necklaces, earrings, bracelets, bangles, pendants, chains, anklets] = parentCategories;

    // Sub-categories
    const subCategories = await Promise.all([
      // Rings subcategories
      tx.category.create({
        data: { name: "Engagement Rings", slug: "engagement-rings", parentId: rings.id, image: "/categories/engagement-rings.jpg" },
      }),
      tx.category.create({
        data: { name: "Cocktail Rings", slug: "cocktail-rings", parentId: rings.id, image: "/categories/cocktail-rings.jpg" },
      }),
      tx.category.create({
        data: { name: "Everyday Rings", slug: "everyday-rings", parentId: rings.id, image: "/categories/everyday-rings.jpg" },
      }),
      // Necklaces subcategories
      tx.category.create({
        data: { name: "Chokers", slug: "chokers", parentId: necklaces.id, image: "/categories/chokers.jpg" },
      }),
      tx.category.create({
        data: { name: "Layered Necklaces", slug: "layered-necklaces", parentId: necklaces.id, image: "/categories/layered-necklaces.jpg" },
      }),
      // Earrings subcategories
      tx.category.create({
        data: { name: "Jhumkas", slug: "jhumkas", parentId: earrings.id, image: "/categories/jhumkas.jpg" },
      }),
      tx.category.create({
        data: { name: "Studs", slug: "studs", parentId: earrings.id, image: "/categories/studs.jpg" },
      }),
      tx.category.create({
        data: { name: "Hoops", slug: "hoops", parentId: earrings.id, image: "/categories/hoops.jpg" },
      }),
    ]);

    const [engagementRings, cocktailRings, everydayRings, chokers, layeredNecklaces, jhumkas, studs, hoops] = subCategories;

    console.log(`   ✓ Created ${parentCategories.length} parent + ${subCategories.length} subcategories`);

    // ═══════════════════════════════════════════════════════
    // 3. COLLECTIONS
    // ═══════════════════════════════════════════════════════
    console.log("🗂️  Creating collections...");

    const [weddingCollection, festiveCollection, dailyCollection] = await Promise.all([
      tx.collection.create({
        data: {
          name: "Wedding Season",
          slug: "wedding-season",
          description:
            "Celebrate love with our curated bridal and wedding jewellery — from polki sets to diamond solitaires crafted for your most special day.",
          image: "/collections/wedding-season.jpg",
          isFeatured: true,
          startDate: new Date("2026-01-01"),
          endDate: new Date("2026-12-31"),
        },
      }),
      tx.collection.create({
        data: {
          name: "Festive Collection",
          slug: "festive-collection",
          description:
            "Dazzle this festive season with gold, kundan, and gemstone pieces inspired by Indian celebrations — Diwali, Navratri, and more.",
          image: "/collections/festive-collection.jpg",
          isFeatured: true,
          startDate: new Date("2026-09-01"),
          endDate: new Date("2027-01-31"),
        },
      }),
      tx.collection.create({
        data: {
          name: "Daily Essentials",
          slug: "daily-essentials",
          description:
            "Minimalist yet striking everyday pieces — lightweight gold, sleek diamonds, and subtle gemstones for the modern Indian woman.",
          image: "/collections/daily-essentials.jpg",
          isFeatured: true,
        },
      }),
    ]);

    console.log(`   ✓ Created 3 collections`);

    // ═══════════════════════════════════════════════════════
    // 4. PRODUCTS & VARIANTS
    // ═══════════════════════════════════════════════════════
    console.log("💎 Creating products and variants...");

    // Helper to build variant data
    interface VariantInput {
      sku: string;
      metalType: MetalType;
      karat: Karat;
      stoneType?: StoneType;
      weight: number;
      basePrice: number;
      markupPrice: number;
      stock: number;
      ringSize?: string;
      images?: string[];
    }

    const createProductWithVariants = async (
      productData: {
        name: string;
        slug: string;
        description: string;
        categoryId: string;
        collectionId?: string;
        metalType: MetalType;
        gender?: Gender;
        occasion: string[];
        isFeatured?: boolean;
        images: string[];
        certificates?: string[];
        careGuide?: string;
      },
      variants: VariantInput[]
    ) => {
      const product = await tx.product.create({
        data: {
          ...productData,
          gender: productData.gender ?? "UNISEX",
          isFeatured: productData.isFeatured ?? false,
          isNew: true,
          isActive: true,
          certificates: productData.certificates ?? [],
          careGuide:
            productData.careGuide ??
            "Store in a soft-lined jewellery box. Avoid contact with perfumes and chemicals. Clean with a soft, dry cloth. Remove before swimming or bathing.",
        },
      });

      for (const v of variants) {
        await tx.productVariant.create({
          data: {
            productId: product.id,
            sku: v.sku,
            metalType: v.metalType,
            karat: v.karat,
            stoneType: v.stoneType ?? "NONE",
            weight: v.weight,
            basePrice: v.basePrice,
            markupPrice: v.markupPrice,
            stock: v.stock,
            ringSize: v.ringSize,
            images: v.images ?? [],
          },
        });
      }

      return product;
    };

    // ── Product 1: Engagement Ring ──
    await createProductWithVariants(
      {
        name: "Celestial Diamond Solitaire Ring",
        slug: "celestial-diamond-solitaire-ring",
        description:
          "A breathtaking solitaire ring featuring a brilliant-cut 0.50ct diamond set in an elegant six-prong setting. The tapered band catches the light beautifully, symbolising eternal love and commitment.",
        categoryId: engagementRings.id,
        collectionId: weddingCollection.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Engagement", "Anniversary", "Wedding"],
        isFeatured: true,
        images: ["/products/celestial-solitaire-1.jpg", "/products/celestial-solitaire-2.jpg", "/products/celestial-solitaire-3.jpg"],
        certificates: ["IGI Certified", "BIS Hallmark"],
      },
      [
        { sku: "CDS-G18-D50-12", metalType: "GOLD", karat: "K18", stoneType: "DIAMOND", weight: 3.2, basePrice: 85000, markupPrice: 95000, stock: 8, ringSize: "12" },
        { sku: "CDS-G18-D50-14", metalType: "GOLD", karat: "K18", stoneType: "DIAMOND", weight: 3.4, basePrice: 87000, markupPrice: 97000, stock: 6, ringSize: "14" },
        { sku: "CDS-P-D50-12", metalType: "PLATINUM", karat: "K18", stoneType: "DIAMOND", weight: 4.1, basePrice: 125000, markupPrice: 139000, stock: 4, ringSize: "12" },
        { sku: "CDS-P-D50-16", metalType: "PLATINUM", karat: "K18", stoneType: "DIAMOND", weight: 4.5, basePrice: 132000, markupPrice: 149000, stock: 3, ringSize: "16" },
      ]
    );

    // ── Product 2: Jhumka Earrings ──
    await createProductWithVariants(
      {
        name: "Maharani Gold Jhumka Earrings",
        slug: "maharani-gold-jhumka-earrings",
        description:
          "Ornate temple-inspired jhumka earrings with fine granulation work and dangling gold beads. Handcrafted by master karigars from Rajasthan, these jhumkas exude regal charm.",
        categoryId: jhumkas.id,
        collectionId: festiveCollection.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Festive", "Wedding", "Traditional"],
        isFeatured: true,
        images: ["/products/maharani-jhumka-1.jpg", "/products/maharani-jhumka-2.jpg"],
        certificates: ["BIS Hallmark"],
      },
      [
        { sku: "MGJ-G22-S", metalType: "GOLD", karat: "K22", weight: 12.5, basePrice: 72000, markupPrice: 82000, stock: 10 },
        { sku: "MGJ-G22-L", metalType: "GOLD", karat: "K22", weight: 18.0, basePrice: 105000, markupPrice: 118000, stock: 7 },
        { sku: "MGJ-G18-S", metalType: "GOLD", karat: "K18", weight: 11.0, basePrice: 58000, markupPrice: 66000, stock: 12 },
      ]
    );

    // ── Product 3: Pearl Necklace ──
    await createProductWithVariants(
      {
        name: "Radiance Pearl Necklace",
        slug: "radiance-pearl-necklace",
        description:
          "A graceful single-strand pearl necklace featuring South Sea cultured pearls graduated from 8mm to 12mm. Set with an 18K gold clasp encrusted with tiny diamonds. Perfect for brides and formal occasions.",
        categoryId: necklaces.id,
        collectionId: weddingCollection.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Wedding", "Formal", "Anniversary"],
        isFeatured: true,
        images: ["/products/radiance-pearl-1.jpg", "/products/radiance-pearl-2.jpg"],
        certificates: ["BIS Hallmark", "GIA Pearl Report"],
      },
      [
        { sku: "RPN-G18-P-16", metalType: "GOLD", karat: "K18", stoneType: "PEARL", weight: 22.0, basePrice: 145000, markupPrice: 165000, stock: 5 },
        { sku: "RPN-G18-P-18", metalType: "GOLD", karat: "K18", stoneType: "PEARL", weight: 26.0, basePrice: 175000, markupPrice: 195000, stock: 3 },
      ]
    );

    // ── Product 4: Gold Chain ──
    await createProductWithVariants(
      {
        name: "Classic Bismark Gold Chain",
        slug: "classic-bismark-gold-chain",
        description:
          "A timeless Bismark-link chain in 22K yellow gold. Sturdy yet elegant, this chain pairs perfectly with pendants or looks stunning on its own. A wardrobe essential for the modern Indian man.",
        categoryId: chains.id,
        collectionId: dailyCollection.id,
        metalType: "GOLD",
        gender: "MEN",
        occasion: ["Daily Wear", "Gifting"],
        images: ["/products/bismark-chain-1.jpg", "/products/bismark-chain-2.jpg"],
        certificates: ["BIS Hallmark"],
      },
      [
        { sku: "CBC-G22-18", metalType: "GOLD", karat: "K22", weight: 15.0, basePrice: 92000, markupPrice: 102000, stock: 15 },
        { sku: "CBC-G22-20", metalType: "GOLD", karat: "K22", weight: 18.5, basePrice: 113000, markupPrice: 125000, stock: 10 },
        { sku: "CBC-G22-22", metalType: "GOLD", karat: "K22", weight: 22.0, basePrice: 135000, markupPrice: 149000, stock: 8 },
      ]
    );

    // ── Product 5: Diamond Studs ──
    await createProductWithVariants(
      {
        name: "Aurora Diamond Stud Earrings",
        slug: "aurora-diamond-stud-earrings",
        description:
          "Classic round brilliant-cut diamond studs in a four-prong basket setting. Total carat weight 0.60ct, F-G colour, VS clarity. Secured with screw-back posts for comfort and safety.",
        categoryId: studs.id,
        collectionId: dailyCollection.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Daily Wear", "Office", "Gifting"],
        isFeatured: true,
        images: ["/products/aurora-studs-1.jpg", "/products/aurora-studs-2.jpg"],
        certificates: ["IGI Certified", "BIS Hallmark"],
      },
      [
        { sku: "ADS-G18-D30", metalType: "GOLD", karat: "K18", stoneType: "DIAMOND", weight: 2.8, basePrice: 42000, markupPrice: 48000, stock: 20 },
        { sku: "ADS-G18-D60", metalType: "GOLD", karat: "K18", stoneType: "DIAMOND", weight: 3.5, basePrice: 78000, markupPrice: 88000, stock: 12 },
        { sku: "ADS-WG18-D60", metalType: "WHITE_GOLD", karat: "K18", stoneType: "DIAMOND", weight: 3.5, basePrice: 82000, markupPrice: 92000, stock: 8 },
      ]
    );

    // ── Product 6: Gold Bangle ──
    await createProductWithVariants(
      {
        name: "Divya Kundan Bangle Set",
        slug: "divya-kundan-bangle-set",
        description:
          "A regal pair of kundan-set gold bangles featuring meenakari enamel work on the reverse. Handcrafted in Jaipur using the traditional jadau technique. Includes two bangles.",
        categoryId: bangles.id,
        collectionId: festiveCollection.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Wedding", "Festive", "Traditional"],
        images: ["/products/divya-kundan-1.jpg", "/products/divya-kundan-2.jpg", "/products/divya-kundan-3.jpg"],
        certificates: ["BIS Hallmark"],
      },
      [
        { sku: "DKB-G22-26", metalType: "GOLD", karat: "K22", stoneType: "KUNDAN", weight: 35.0, basePrice: 210000, markupPrice: 235000, stock: 4 },
        { sku: "DKB-G22-28", metalType: "GOLD", karat: "K22", stoneType: "KUNDAN", weight: 38.0, basePrice: 228000, markupPrice: 250000, stock: 3 },
      ]
    );

    // ── Product 7: Pendant ──
    await createProductWithVariants(
      {
        name: "Aarav Ruby Pendant",
        slug: "aarav-ruby-pendant",
        description:
          "A stunning oval-cut natural Burmese ruby (1.2ct) set in a diamond-studded 18K gold pendant. The pendant features a milgrain border adding a vintage touch. Perfect for special occasions.",
        categoryId: pendants.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Anniversary", "Gifting", "Formal"],
        images: ["/products/aarav-ruby-1.jpg", "/products/aarav-ruby-2.jpg"],
        certificates: ["GRS Certificate", "BIS Hallmark"],
      },
      [
        { sku: "ARP-G18-R12", metalType: "GOLD", karat: "K18", stoneType: "RUBY", weight: 4.5, basePrice: 62000, markupPrice: 72000, stock: 6 },
        { sku: "ARP-RG18-R12", metalType: "ROSE_GOLD", karat: "K18", stoneType: "RUBY", weight: 4.5, basePrice: 64000, markupPrice: 74000, stock: 5 },
      ]
    );

    // ── Product 8: Bracelet ──
    await createProductWithVariants(
      {
        name: "Eternity Diamond Tennis Bracelet",
        slug: "eternity-diamond-tennis-bracelet",
        description:
          "A classic tennis bracelet set with 40 round brilliant-cut diamonds totalling 3.0ct in a secure four-prong setting. The bracelet features a hidden safety clasp for worry-free wear.",
        categoryId: bracelets.id,
        collectionId: weddingCollection.id,
        metalType: "WHITE_GOLD",
        gender: "WOMEN",
        occasion: ["Anniversary", "Wedding", "Formal"],
        isFeatured: true,
        images: ["/products/eternity-tennis-1.jpg", "/products/eternity-tennis-2.jpg"],
        certificates: ["IGI Certified", "BIS Hallmark"],
      },
      [
        { sku: "EDT-WG18-D30-7", metalType: "WHITE_GOLD", karat: "K18", stoneType: "DIAMOND", weight: 12.0, basePrice: 185000, markupPrice: 210000, stock: 4 },
        { sku: "EDT-G18-D30-7", metalType: "GOLD", karat: "K18", stoneType: "DIAMOND", weight: 12.0, basePrice: 180000, markupPrice: 205000, stock: 5 },
      ]
    );

    // ── Product 9: Cocktail Ring ──
    await createProductWithVariants(
      {
        name: "Amara Emerald Cocktail Ring",
        slug: "amara-emerald-cocktail-ring",
        description:
          "A showstopping cocktail ring featuring a 2.0ct Colombian emerald surrounded by a double halo of diamonds. The split shank adds drama and sparkle from every angle.",
        categoryId: cocktailRings.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Party", "Formal", "Gifting"],
        images: ["/products/amara-emerald-1.jpg", "/products/amara-emerald-2.jpg"],
        certificates: ["GRS Certificate", "BIS Hallmark"],
      },
      [
        { sku: "AEC-G18-E20-14", metalType: "GOLD", karat: "K18", stoneType: "EMERALD", weight: 6.8, basePrice: 145000, markupPrice: 165000, stock: 3, ringSize: "14" },
        { sku: "AEC-G18-E20-12", metalType: "GOLD", karat: "K18", stoneType: "EMERALD", weight: 6.5, basePrice: 142000, markupPrice: 162000, stock: 4, ringSize: "12" },
        { sku: "AEC-G18-E20-16", metalType: "GOLD", karat: "K18", stoneType: "EMERALD", weight: 7.0, basePrice: 148000, markupPrice: 168000, stock: 2, ringSize: "16" },
      ]
    );

    // ── Product 10: Everyday Ring ──
    await createProductWithVariants(
      {
        name: "Prerna Minimalist Gold Band",
        slug: "prerna-minimalist-gold-band",
        description:
          "A sleek, comfort-fit gold band with a subtle satin finish on the outer surface and a mirror-polished interior. Ideal for daily wear, this minimalist band is a modern classic.",
        categoryId: everydayRings.id,
        collectionId: dailyCollection.id,
        metalType: "GOLD",
        gender: "UNISEX",
        occasion: ["Daily Wear", "Gifting"],
        images: ["/products/prerna-band-1.jpg", "/products/prerna-band-2.jpg"],
        certificates: ["BIS Hallmark"],
      },
      [
        { sku: "PMB-G22-12", metalType: "GOLD", karat: "K22", weight: 4.0, basePrice: 24000, markupPrice: 28000, stock: 25, ringSize: "12" },
        { sku: "PMB-G22-14", metalType: "GOLD", karat: "K22", weight: 4.5, basePrice: 27000, markupPrice: 31000, stock: 20, ringSize: "14" },
        { sku: "PMB-G22-16", metalType: "GOLD", karat: "K22", weight: 5.0, basePrice: 30000, markupPrice: 34000, stock: 18, ringSize: "16" },
        { sku: "PMB-G18-14", metalType: "GOLD", karat: "K18", weight: 4.2, basePrice: 22000, markupPrice: 26000, stock: 22, ringSize: "14" },
      ]
    );

    // ── Product 11: Silver Anklet ──
    await createProductWithVariants(
      {
        name: "Noor Silver Anklet Pair",
        slug: "noor-silver-anklet-pair",
        description:
          "Delicate sterling silver anklets featuring tiny ghungroo (bell) charms and a traditional payal design. Adjustable length fits most ankle sizes. Sold as a pair.",
        categoryId: anklets.id,
        collectionId: dailyCollection.id,
        metalType: "SILVER",
        gender: "WOMEN",
        occasion: ["Daily Wear", "Traditional", "Festive"],
        images: ["/products/noor-anklet-1.jpg", "/products/noor-anklet-2.jpg"],
      },
      [
        { sku: "NSA-S-STD", metalType: "SILVER", karat: "K22", weight: 20.0, basePrice: 3200, markupPrice: 3800, stock: 30 },
        { sku: "NSA-S-HVY", metalType: "SILVER", karat: "K22", weight: 30.0, basePrice: 4800, markupPrice: 5500, stock: 20 },
      ]
    );

    // ── Product 12: Choker Necklace ──
    await createProductWithVariants(
      {
        name: "Rani Polki Bridal Choker",
        slug: "rani-polki-bridal-choker",
        description:
          "A magnificent bridal choker featuring uncut polki diamonds set in 22K gold with intricate meenakari on the reverse. This heritage piece is inspired by Mughal court jewellery and is perfect for the bride who wants a regal look.",
        categoryId: chokers.id,
        collectionId: weddingCollection.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Wedding", "Bridal", "Reception"],
        isFeatured: true,
        images: ["/products/rani-polki-1.jpg", "/products/rani-polki-2.jpg", "/products/rani-polki-3.jpg"],
        certificates: ["BIS Hallmark"],
      },
      [
        { sku: "RPC-G22-PK-STD", metalType: "GOLD", karat: "K22", stoneType: "POLKI", weight: 65.0, basePrice: 420000, markupPrice: 475000, stock: 2 },
        { sku: "RPC-G22-PK-LG", metalType: "GOLD", karat: "K22", stoneType: "POLKI", weight: 80.0, basePrice: 520000, markupPrice: 580000, stock: 1 },
      ]
    );

    // ── Product 13: Hoop Earrings ──
    await createProductWithVariants(
      {
        name: "Siya Rose Gold Hoop Earrings",
        slug: "siya-rose-gold-hoop-earrings",
        description:
          "Modern rose gold hoop earrings with a twisted rope texture. Lightweight and versatile, these hoops transition effortlessly from brunch to evening wear.",
        categoryId: hoops.id,
        collectionId: dailyCollection.id,
        metalType: "ROSE_GOLD",
        gender: "WOMEN",
        occasion: ["Daily Wear", "Casual", "Office"],
        images: ["/products/siya-hoops-1.jpg", "/products/siya-hoops-2.jpg"],
        certificates: ["BIS Hallmark"],
      },
      [
        { sku: "SRG-RG18-SM", metalType: "ROSE_GOLD", karat: "K18", weight: 3.8, basePrice: 19000, markupPrice: 23000, stock: 18 },
        { sku: "SRG-RG18-MD", metalType: "ROSE_GOLD", karat: "K18", weight: 5.2, basePrice: 26000, markupPrice: 31000, stock: 14 },
        { sku: "SRG-RG18-LG", metalType: "ROSE_GOLD", karat: "K18", weight: 7.0, basePrice: 35000, markupPrice: 42000, stock: 10 },
      ]
    );

    // ── Product 14: Layered Necklace ──
    await createProductWithVariants(
      {
        name: "Ishaan Sapphire Layered Necklace",
        slug: "ishaan-sapphire-layered-necklace",
        description:
          "A stunning three-layer gold necklace graduating from 16 to 22 inches. The shortest layer features a dainty sapphire pendant, the middle a diamond bar, and the longest a delicate gold chain with sapphire drops.",
        categoryId: layeredNecklaces.id,
        metalType: "GOLD",
        gender: "WOMEN",
        occasion: ["Party", "Formal", "Gifting"],
        images: ["/products/ishaan-layered-1.jpg", "/products/ishaan-layered-2.jpg"],
        certificates: ["BIS Hallmark", "GIA Sapphire Report"],
      },
      [
        { sku: "ISL-G18-SP-STD", metalType: "GOLD", karat: "K18", stoneType: "SAPPHIRE", weight: 14.0, basePrice: 98000, markupPrice: 112000, stock: 6 },
        { sku: "ISL-RG18-SP-STD", metalType: "ROSE_GOLD", karat: "K18", stoneType: "SAPPHIRE", weight: 14.0, basePrice: 100000, markupPrice: 115000, stock: 4 },
      ]
    );

    console.log(`   ✓ Created 14 products with variants`);

    // ═══════════════════════════════════════════════════════
    // 5. BANNERS
    // ═══════════════════════════════════════════════════════
    console.log("🖼️  Creating banners...");

    await tx.banner.createMany({
      data: [
        {
          title: "Wedding Season Collection",
          subtitle: "Exquisite bridal jewellery crafted for your special day",
          image: "/banners/wedding-hero.jpg",
          link: "/collections/wedding-season",
          position: "hero",
          isActive: true,
          order: 1,
        },
        {
          title: "Festive Sparkle",
          subtitle: "Celebrate with gold, diamonds & kundan — up to 20% off",
          image: "/banners/festive-hero.jpg",
          link: "/collections/festive-collection",
          position: "hero",
          isActive: true,
          order: 2,
        },
        {
          title: "Everyday Elegance",
          subtitle: "Lightweight pieces starting at ₹3,000",
          image: "/banners/daily-hero.jpg",
          link: "/collections/daily-essentials",
          position: "hero",
          isActive: true,
          order: 3,
        },
        {
          title: "Custom Jewellery",
          subtitle: "Design your dream piece — our karigars bring your vision to life",
          image: "/banners/custom-sidebar.jpg",
          link: "/custom-order",
          position: "sidebar",
          isActive: true,
          order: 1,
        },
        {
          title: "Free Shipping on Orders Above ₹25,000",
          subtitle: "Insured delivery across India",
          image: "/banners/shipping-footer.jpg",
          link: "/shipping-policy",
          position: "footer",
          isActive: true,
          order: 1,
        },
      ],
    });

    console.log(`   ✓ Created 5 banners`);

    // ═══════════════════════════════════════════════════════
    // 6. COUPONS
    // ═══════════════════════════════════════════════════════
    console.log("🎟️  Creating coupons...");

    await tx.coupon.createMany({
      data: [
        {
          code: "WELCOME500",
          type: "FLAT" as CouponType,
          value: 500,
          minCartValue: 5000,
          maxDiscount: 500,
          usageLimit: 1000,
          usedCount: 0,
          startDate: new Date("2026-01-01"),
          endDate: new Date("2026-12-31"),
          isActive: true,
        },
        {
          code: "DIWALI20",
          type: "PERCENT" as CouponType,
          value: 20,
          minCartValue: 10000,
          maxDiscount: 15000,
          usageLimit: 500,
          usedCount: 0,
          startDate: new Date("2026-10-01"),
          endDate: new Date("2026-11-15"),
          isActive: true,
        },
        {
          code: "FIRST10",
          type: "PERCENT" as CouponType,
          value: 10,
          minCartValue: 3000,
          maxDiscount: 10000,
          usageLimit: 2000,
          usedCount: 0,
          startDate: new Date("2026-01-01"),
          endDate: new Date("2027-03-31"),
          isActive: true,
        },
      ],
    });

    console.log(`   ✓ Created 3 coupons`);

    // ═══════════════════════════════════════════════════════
    // 7. GOLD PRICE LOGS
    // ═══════════════════════════════════════════════════════
    console.log("📊 Creating gold price logs...");

    const today = new Date();
    const priceData = [
      // Recent gold prices (per gram)
      { metalType: "GOLD" as MetalType, karat: "K24" as Karat, pricePerGram: 7350, source: "manual" },
      { metalType: "GOLD" as MetalType, karat: "K22" as Karat, pricePerGram: 6735, source: "manual" },
      { metalType: "GOLD" as MetalType, karat: "K18" as Karat, pricePerGram: 5513, source: "manual" },
      { metalType: "GOLD" as MetalType, karat: "K14" as Karat, pricePerGram: 4288, source: "manual" },
      { metalType: "SILVER" as MetalType, karat: "K24" as Karat, pricePerGram: 92, source: "manual" },
      // Historical entries (7 days ago)
      { metalType: "GOLD" as MetalType, karat: "K24" as Karat, pricePerGram: 7280, source: "api" },
      { metalType: "GOLD" as MetalType, karat: "K22" as Karat, pricePerGram: 6670, source: "api" },
      { metalType: "GOLD" as MetalType, karat: "K18" as Karat, pricePerGram: 5460, source: "api" },
      { metalType: "SILVER" as MetalType, karat: "K24" as Karat, pricePerGram: 88, source: "api" },
      // Historical entries (14 days ago)
      { metalType: "GOLD" as MetalType, karat: "K24" as Karat, pricePerGram: 7200, source: "api" },
      { metalType: "GOLD" as MetalType, karat: "K22" as Karat, pricePerGram: 6600, source: "api" },
      { metalType: "GOLD" as MetalType, karat: "K18" as Karat, pricePerGram: 5400, source: "api" },
      { metalType: "SILVER" as MetalType, karat: "K24" as Karat, pricePerGram: 85, source: "api" },
    ];

    for (let i = 0; i < priceData.length; i++) {
      const daysAgo = i < 5 ? 0 : i < 9 ? 7 : 14;
      const createdAt = new Date(today);
      createdAt.setDate(createdAt.getDate() - daysAgo);

      await tx.goldPriceLog.create({
        data: {
          metalType: priceData[i].metalType,
          karat: priceData[i].karat,
          pricePerGram: priceData[i].pricePerGram,
          source: priceData[i].source,
          createdAt,
        },
      });
    }

    console.log(`   ✓ Created ${priceData.length} gold/silver price logs`);

    // ═══════════════════════════════════════════════════════
    // 8. WISHLIST & CART for demo user
    // ═══════════════════════════════════════════════════════
    console.log("🛒 Creating demo cart & wishlist...");

    // Fetch some product IDs for the demo user's cart and wishlist
    const sampleProducts = await tx.product.findMany({ take: 3 });
    const sampleVariants = await tx.productVariant.findMany({ take: 2 });

    if (sampleProducts.length > 0) {
      const wishlist = await tx.wishlist.create({
        data: { userId: regularUser.id },
      });

      for (const product of sampleProducts) {
        await tx.wishlistItem.create({
          data: { wishlistId: wishlist.id, productId: product.id },
        });
      }
    }

    if (sampleVariants.length > 0) {
      const cart = await tx.cart.create({
        data: { userId: regularUser.id },
      });

      for (const variant of sampleVariants) {
        await tx.cartItem.create({
          data: { cartId: cart.id, variantId: variant.id, quantity: 1 },
        });
      }
    }

    console.log(`   ✓ Created demo cart (${sampleVariants.length} items) & wishlist (${sampleProducts.length} items)`);

    // ═══════════════════════════════════════════════════════
    // 9. NOTIFICATIONS for demo user
    // ═══════════════════════════════════════════════════════
    console.log("🔔 Creating sample notifications...");

    await tx.notification.createMany({
      data: [
        {
          userId: regularUser.id,
          type: "PROMOTION",
          title: "Diwali Sale is Live! 🪔",
          body: "Get up to 20% off on our festive collection. Use code DIWALI20 at checkout.",
          link: "/collections/festive-collection",
          isRead: false,
        },
        {
          userId: regularUser.id,
          type: "SYSTEM",
          title: "Welcome to our store!",
          body: "Thank you for joining us. Enjoy ₹500 off on your first order with code WELCOME500.",
          link: "/shop",
          isRead: true,
        },
      ],
    });

    console.log(`   ✓ Created 2 notifications`);
  });

  console.log("\n✅ Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
