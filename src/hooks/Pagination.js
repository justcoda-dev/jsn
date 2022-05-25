import React, {useEffect, useState} from 'react'

export default function PaginatedItems(itemsPerPage, items) {
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(items.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, items])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length
        setItemOffset(newOffset)
    };

    return {
        currentItems,
        handlePageClick,
        pageCount,
    }
}
