import { useState } from 'react';

import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import { Section } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';

import { Layout } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const addFeedback = state => {
    setState(prevState => ({ ...prevState, [state]: prevState[state] + 1 }));
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((a, b) => a + b);
  };

  const countPositiveFeedbackPercentage = () => {
    if (!countTotalFeedback()) return 0;
    return Math.round((state.good / countTotalFeedback()) * 100);
  };

  const { good, neutral, bad } = state;
  console.log(good, neutral, bad);
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Layout>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={addFeedback}
        />
      </Section>

      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>

      <GlobalStyle />
    </Layout>
  );
};
