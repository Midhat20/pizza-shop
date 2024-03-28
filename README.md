# pizza-shop

Pizza Shop Application

This repository contains the source code for a pizza restaurant simulation application built using React, TypeScript, Redux, HTML, and CSS. The application simulates the behavior of a pizza restaurant, from taking orders to preparing and delivering pizzas.

Features
1. Order Placement Form: Users can place pizza orders through a form, where they can configure the type (Veg or Non-Veg), size (Large, Medium, Small), and base (Thin or Thick) of the pizza.

2. Order Limit Handling: The restaurant can handle a maximum of 10 orders at a time. If there are already 10 orders in progress, the application displays a message indicating that new orders cannot be taken at the moment.

3. Order Stages: Orders go through different stages:
Order Placed
Order in Making
Order Ready
Order Picked

4. Stage Highlighting: If a pizza remains in the same stage for more than 3 minutes, it is highlighted in red to indicate a delay.

5. Time Tracking: The application displays the time spent in each stage for each pizza.

6. Display of Pizza Stages: Each stage of the pizza is displayed in different columns, with pizzas represented as cards.

7. Main Display: The main display shows:

All pizzas in progress with their remaining time and order ID.
Total pizzas delivered today.
Order Cancellation: Orders can be canceled at any time before they reach the Ready stage from the Main section.

8.Manual Stage Transition: Pizzas can be moved from one stage to another manually using buttons for next, picked, or cancel actions.

9.Single Page Application: Both screens (order placement form and main display) are on the same page for seamless interaction.
