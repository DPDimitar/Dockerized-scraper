import React from "react";

interface IProps {
    propertiesPerPage: number,
    totalProperties: number,
    currentPage: number,
    paginate: (newType: number) => void
}

const Pagination = ({propertiesPerPage, totalProperties, currentPage, paginate}: IProps) => {

    const pageNumbers: number[] = []

    let add = 2
    let subtract = 2

    if (currentPage - subtract < 1 && currentPage - subtract + 1 < 1)
        add += 1

    if (currentPage == Math.ceil(totalProperties / propertiesPerPage))
        subtract += 1


    for (let i = currentPage - subtract; i <= currentPage + add; i++) {
        if (i > 0 && i <= Math.ceil(totalProperties / propertiesPerPage))
            pageNumbers.push(i)
    }


    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a onClick={() => {
                        if (currentPage != 1)
                            paginate(1)
                    }} href="#" className={"page-link" + (currentPage == 1 ? " disabled" : "")}>
                        {"<<"}
                    </a>
                </li>
                <li className="page-item">
                    <a onClick={() => {
                        if (currentPage - 1 > 0)
                            paginate(currentPage - 1)
                    }} href="#" className={"page-link" + (currentPage - 1 < 1 ? " disabled" : "")}>
                        {"<"}
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li className="page-item" key={number}>
                        <a onClick={() => paginate(number)} href="#"
                           className={"page-link" + (currentPage == number ? " active" : "")}>
                            {number}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a onClick={() => {
                        if (currentPage + 1 <= Math.ceil(totalProperties / propertiesPerPage))
                            paginate(currentPage + 1)
                    }} href="#" className={"page-link" + (currentPage + 1 > Math.ceil(totalProperties / propertiesPerPage) ? " disabled" : "")}>
                        {">"}
                    </a>
                </li>
                <li className="page-item">
                    <a onClick={() => {
                        if (currentPage != Math.ceil(totalProperties / propertiesPerPage))
                            paginate(Math.ceil(totalProperties / propertiesPerPage))
                    }} href="#"
                       className={"page-link" + (currentPage == Math.ceil(totalProperties / propertiesPerPage) ? " disabled" : "")}>
                        {">>"}
                    </a>
                </li>
            </ul>
        </nav>
    )

}

export default Pagination