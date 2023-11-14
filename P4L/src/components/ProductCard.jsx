import React from 'react';
import { Card, Avatar, Typography, Rate } from 'antd';
import './index.css'

const { Meta } = Card;
const { Title, Text } = Typography;

const ProductCard = ({ image, name, price, rating }) => {
  return (
    <Card hoverable className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <Meta
        title={<Title level={4}>{name}</Title>}
        description={
          <>
            <Text strong>Price: </Text>
            <Text>${price}</Text>
            <br />
            <Text strong>Rating: </Text>
            <Rate disabled defaultValue={rating} />
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;