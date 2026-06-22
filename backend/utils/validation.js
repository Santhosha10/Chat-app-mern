import mongoose from "mongoose";

export const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

export const normalizeUsername = (value) => normalizeText(value).toLowerCase();

export const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const usernamePattern = /^[a-z0-9_]{3,24}$/;

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeEmail = (value) => normalizeText(value).toLowerCase();
