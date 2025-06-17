import { client } from "./sanity";
import { HOMEPAGE_QUERY, NAVIGATION_QUERY, CTA_QUERY } from "./queries";
import { PAGE_TYPES, type PageType } from "./constants";
import type { HomepageData, NavigationProps, CTAProps, PageParams } from "./types";

/**
 * Service class for handling all data fetching operations
 * Follows Single Responsibility Principle by centralizing data access
 */
export class DataService {
  /**
   * Fetch homepage content for a specific language
   */
  static async getHomepageData(lang: string): Promise<HomepageData> {
    try {
      const data = await client.fetch<HomepageData>(HOMEPAGE_QUERY, {
        lang,
        pageType: PAGE_TYPES.HOME,
      });

      if (!data) {
        throw new Error(`Homepage data not found for language: ${lang}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching homepage data:", error);
      throw error;
    }
  }

  /**
   * Fetch navigation data for a specific language
   */
  static async getNavigationData(lang: string): Promise<NavigationProps> {
    try {
      const data = await client.fetch<NavigationProps>(NAVIGATION_QUERY, { lang });

      if (!data) {
        throw new Error(`Navigation data not found for language: ${lang}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching navigation data:", error);
      throw error;
    }
  }

  /**
   * Fetch CTA data for a specific language
   */
  static async getCTAData(lang: string): Promise<CTAProps> {
    try {
      const data = await client.fetch<CTAProps>(CTA_QUERY, { lang });

      if (!data) {
        throw new Error(`CTA data not found for language: ${lang}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching CTA data:", error);
      throw error;
    }
  }

  /**
   * Fetch page data for any page type
   */
  static async getPageData(lang: string, pageType: PageType): Promise<HomepageData> {
    try {
      const data = await client.fetch<HomepageData>(HOMEPAGE_QUERY, {
        lang,
        pageType,
      });

      if (!data) {
        throw new Error(`Page data not found for language: ${lang}, pageType: ${pageType}`);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching page data for ${pageType}:`, error);
      throw error;
    }
  }
}

/**
 * Utility functions for common operations
 */
export class PageUtils {
  /**
   * Validate page parameters
   */
  static validatePageParams(params: PageParams): void {
    if (!params.lang) {
      throw new Error("Language parameter is required");
    }
  }

  /**
   * Get default error page data
   */
  static getErrorPageData(): HomepageData {
    return {
      content: [],
      seo: {
        metaTitle: "Error",
        metaDescription: "An error occurred while loading the page",
      },
    };
  }
} 