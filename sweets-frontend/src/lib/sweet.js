const imageUrls = [
    "https://images.unsplash.com/photo-1551024506-0dfccd2bf07f?w=400&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1c9587?w=400&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1563805042-5618a9b7ce88?w=400&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1594736797933-d0c2ce28b0a3?w=400&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1598300042247-bf85e4b87f53?w=400&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&auto=format&q=80",
  ];
  
  export const getSweetImageUrl = (sweet) => {
    const seed = (sweet._id || sweet.id || sweet.name || "sweet").toString();
    const index =
      seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
      imageUrls.length;
  
    return imageUrls[index];
  };