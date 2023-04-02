export const getAllProductsQuery = `
    SELECT p.*,
    b.name AS brand_name,
    b.image AS brand_image,
    sc.name_tm || ' / ' || sc.name_ru AS sub_category_name,
    c.name_tm || ' / ' || c.name_ru AS category_name,
    g.name_tm || ' / ' || g.name_ru AS gender_name,
    (SELECT pp.image_url FROM product_image pp WHERE pp.product_id=p.id LIMIT 1) AS first_image,
    (SELECT array_to_json(array_agg(pi.*)) FROM product_image pi WHERE pi.product_id=p.id) AS images

    FROM product p 
    LEFT JOIN brand b ON p.brand_id = b.id
    LEFT JOIN sub_category sc ON p.sub_category_id = sc.id
    LEFT JOIN category c ON sc.category_id = c.id
    LEFT JOIN gender g ON g.id  = p.gender_id
    %s
    %s
    LIMIT $1 OFFSET ($2 - 1) * $1;
`;

// SELECT * FROM users WHERE 1==1;
// sql-injection 

export const getAllBrandsQuery = `SELECT * FROM brand;`;
export const getAllSubCategoryQuery = `SELECT * FROM sub_category;`;
export const getAllGendersQuery = `SELECT * FROM gender;`;