/**
 * Product Service - Xử lý business logic cho sản phẩm
 * Chịu trách nhiệm: CRUD operations, search, filtering
 */

import Product, { IProduct } from '../models/Product';
import { CreateProductInput, ProductQueryInput } from '../utils/validate';
import { AppError } from '../utils/errorHandler';
import { createSlug, createUniqueSlug } from '../utils/slug';

export class ProductService {
  /**
   * Lấy danh sách sản phẩm với filter và pagination
   */
  async getProducts(query: ProductQueryInput) {
    const { tag, search, page = 1, limit = 12 } = query;
    
    // Build filter object
    const filter: any = {};
    
    if (tag) {
      filter.tags = { $in: [tag] };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute queries
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      }
    };
  }

  /**
   * Lấy sản phẩm theo slug
   */
  async getProductBySlug(slug: string): Promise<IProduct> {
    const product = await Product.findOne({ slug }).lean();
    
    if (!product) {
      throw new AppError('Không tìm thấy sản phẩm', 404);
    }
    
    return product;
  }

  /**
   * Lấy sản phẩm theo ID
   */
  async getProductById(id: string): Promise<IProduct> {
    const product = await Product.findById(id).lean();
    
    if (!product) {
      throw new AppError('Không tìm thấy sản phẩm', 404);
    }
    
    return product;
  }

  /**
   * Tạo sản phẩm mới
   */
  async createProduct(data: CreateProductInput): Promise<IProduct> {
    // Generate slug if not provided
    let slug = data.slug;
    if (!slug) {
      const baseSlug = createSlug(data.name);
      const existingSlugs = await Product.distinct('slug');
      slug = createUniqueSlug(baseSlug, existingSlugs);
    } else {
      // Check if provided slug already exists
      const existingProduct = await Product.findOne({ slug });
      if (existingProduct) {
        throw new AppError('Slug đã tồn tại', 400);
      }
    }

    const productData = {
      ...data,
      slug
    };

    const product = new Product(productData);
    await product.save();
    
    return product.toObject();
  }

  /**
   * Cập nhật sản phẩm
   */
  async updateProduct(id: string, data: CreateProductInput): Promise<IProduct> {
    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      throw new AppError('Không tìm thấy sản phẩm', 404);
    }

    // Generate slug if not provided or if name changed
    let slug = data.slug;
    if (!slug || data.name !== existingProduct.name) {
      const baseSlug = createSlug(data.name);
      const existingSlugs = await Product.distinct('slug', { _id: { $ne: id } });
      slug = createUniqueSlug(baseSlug, existingSlugs);
    } else if (slug !== existingProduct.slug) {
      // Check if new slug already exists
      const slugExists = await Product.findOne({ slug, _id: { $ne: id } });
      if (slugExists) {
        throw new AppError('Slug đã tồn tại', 400);
      }
    }

    const updateData = {
      ...data,
      slug,
      updatedAt: new Date()
    };

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!product) {
      throw new AppError('Không thể cập nhật sản phẩm', 500);
    }

    return product;
  }

  /**
   * Xóa sản phẩm
   */
  async deleteProduct(id: string): Promise<void> {
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Không tìm thấy sản phẩm', 404);
    }

    await Product.findByIdAndDelete(id);
  }

  /**
   * Lấy tất cả tags có sẵn
   */
  async getAllTags(): Promise<string[]> {
    const tags = await Product.distinct('tags');
    return tags.sort();
  }

  /**
   * Lấy sản phẩm liên quan (cùng tags)
   */
  async getRelatedProducts(productId: string, limit: number = 4): Promise<IProduct[]> {
    const product = await Product.findById(productId);
    if (!product) {
      return [];
    }

    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      tags: { $in: product.tags }
    })
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

    return relatedProducts;
  }
}
