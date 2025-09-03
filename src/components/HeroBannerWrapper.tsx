"use client"

import React, { Suspense, lazy } from "react"

// Chart lazy load
// const Chart = lazy(() => import("@/components/Chart"))

// HeroBanner lazy load + fallback UI
const HeroBannerLazy = lazy(() => import("./HeroBanner"))

export default function HeroBannerWrapper() {
  return (
    <Suspense
      fallback={
        <section className="relative h-[90vh] w-full bg-cover bg-center bg-[#F5F1EB] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-300 rounded mb-4 mx-auto w-3/4"></div>
              <div className="h-8 bg-gray-300 rounded mb-8 mx-auto w-1/2"></div>
              <div className="h-12 bg-gray-300 rounded mx-auto w-96"></div>
            </div>
          </div>
        </section>
      }
    >
      <HeroBannerLazy />
    </Suspense>
  )
}
