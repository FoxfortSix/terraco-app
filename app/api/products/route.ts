import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}