-- CreateTable
CREATE TABLE "WardrobeItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WardrobeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedLook" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "top" TEXT,
    "bottom" TEXT,
    "outerwear" TEXT,
    "shoes" TEXT,
    "bag" TEXT,
    "extras" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedLook_pkey" PRIMARY KEY ("id")
);
