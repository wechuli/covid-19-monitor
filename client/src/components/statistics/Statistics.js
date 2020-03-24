import React, { useState } from "react";
import { Statistic, Card, Row, Col } from "antd";
import "./site-statistic-demo-card.scss";

const Statistics = props => {
  const { total_cases, total_deaths, affected_countries } = props.data[0];

  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Countries Affected"
              value={parseInt(affected_countries)}
              precision={0}
              
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Cases"
              value={parseInt(total_cases)}
              precision={0}
              valueStyle={{ color: "orange" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Deaths"
              value={parseInt(total_deaths)}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
