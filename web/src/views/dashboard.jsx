import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const MainContent = styled('div')`
  width: 90%;
  margin: auto;
  min-height: 100vh;
  padding-top: ${p => p.theme.spacing.standard * 2}px;
  padding-left: ${p => p.theme.spacing.standard * 2}px;
  padding-right: ${p => p.theme.spacing.standard * 2}px;
  padding-bottom: ${p => p.theme.spacing.standard * 3}px;
`;

export const Dashboard = props => (
  <div>
    <MainContent>
      test
    </MainContent>
  </div>
);

export default connect(
  null,
  null
)(Dashboard);
