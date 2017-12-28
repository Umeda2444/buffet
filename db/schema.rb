# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171228091244) do

  create_table "restaurants", force: :cascade do |t|
    t.string   "restaurant_name", limit: 255
    t.string   "category",        limit: 255
    t.text     "place",           limit: 65535
    t.text     "holiday",         limit: 65535
    t.text     "opening_hour",    limit: 65535
    t.string   "tel",             limit: 255
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "mood",          limit: 4
    t.integer  "temperature",   limit: 4
    t.integer  "music",         limit: 4
    t.integer  "design",        limit: 4
    t.integer  "creanliness",   limit: 4
    t.integer  "food",          limit: 4
    t.integer  "umami",         limit: 4
    t.integer  "amami",         limit: 4
    t.integer  "sanmi",         limit: 4
    t.integer  "siomi",         limit: 4
    t.integer  "nigami",        limit: 4
    t.integer  "service",       limit: 4
    t.integer  "speed",         limit: 4
    t.integer  "care",          limit: 4
    t.integer  "value",         limit: 4
    t.integer  "custom",        limit: 4
    t.string   "user_id",       limit: 255
    t.string   "restaurant_id", limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "username",               limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
