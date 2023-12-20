// Function to get a specific page of items
export default function getPageItems(items, page, itemsPerPage) {
    // Calculate the start and end index for the requested page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Use splice to extract the items for the page
    const pageItems = items.slice(startIndex, endIndex);
  
    return pageItems;
  }