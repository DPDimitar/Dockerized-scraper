import React from "react";
import {Card, CardImg} from "react-bootstrap";

interface IProps {
    properties: {
        id: number,
        title: string,
        location: string,
        price: string,
        img: string
    }[],
    loading: boolean
}

const Properties = ({...props}: IProps) => {

    if (props.loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className="row mb-4">
            {props.properties.map(property => (
                <div className="col-lg-4 col-md-6 col-12">
                    <Card key={property.id}>
                        <Card.Img variant={"top"} src={property.img}/>
                        <Card.Body>
                            <Card.Title>{property.title}</Card.Title>
                            <Card.Text>
                                <p>Location: {property.location}</p>
                                <p>Price: {property.price}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default Properties