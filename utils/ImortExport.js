import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

export { express, mongoose, nanoid, path, fileURLToPath, jwt, bcrypt, cookieParser };