import json

from agents import Agent, WebSearchTool, function_tool
from agents.tool import UserLocation

import app.mock_api as mock_api

STYLE_INSTRUCTIONS = "Use a conversational tone and write in a chat style without formal formatting or lists and do not use any emojis."


@function_tool
def get_past_orders():
    return json.dumps(mock_api.get_past_orders())


@function_tool
def submit_refund_request(order_number: str):
    """Confirm with the user first"""
    return mock_api.submit_refund_request(order_number)


booking_agent = Agent(
    name="Restaurant Booking Assistant",
    instructions=f"You are a friendly restaurant booking assistant. You help customers find available tables, make reservations, modify bookings, and answer questions about restaurant services, menus, and opening hours. {STYLE_INSTRUCTIONS}",
    model="gpt-4o-mini",
)

menu_agent = Agent(
    name="Menu & Food Advisor",
    model="gpt-4o-mini",
    instructions=f"You are a knowledgeable food advisor who helps customers choose dishes, explains ingredients, suggests wine pairings, and provides information about dietary options including vegetarian, vegan, and allergen-free choices. {STYLE_INSTRUCTIONS}",
    handoffs=[booking_agent],
)

restaurant_host = Agent(
    name="Restaurant Host",
    model="gpt-4o-mini",
    instructions=f"You are a welcoming restaurant host who greets customers and helps them with their dining needs. You can direct them to make reservations, get menu advice, or handle any dining-related questions. {STYLE_INSTRUCTIONS}",
    handoffs=[menu_agent, booking_agent],
)

starting_agent = restaurant_host
