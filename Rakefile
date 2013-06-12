# Copyright 2013 Team 254. All Rights Reserved.
# @author pat@patfairbank.com (Patrick Fairbank)
#
# Contains maintenance and deployment configuration.

require "bundler/setup"
require "fezzik"
require "pathological"
require "sequel"

Sequel.extension :migration

# Task for executing any pending database schema changes.
namespace :db do
  task :migrate do
    require "db"
    Sequel::Migrator.run(DB, "db/migrations")
  end
end

include Fezzik::DSL
Fezzik.init(:tasks => "config/tasks")

set :app, "cheesy-action-items"
set :deploy_to, "/opt/team254/#{app}"
set :release_path, "#{deploy_to}/releases/#{Time.now.strftime("%Y%m%d%H%M")}"
set :local_path, Dir.pwd
set :user, "ubuntu"

Fezzik.destination :prod do
  # Fill in parameters for deployment host, database and e-mail account here.
  set :domain, "#{user}@action-items.team254.com"
  env :port, 9003
  env :db_host, "localhost"
  env :db_user, "team254"
  env :db_password, "complementingnotmixing"
  env :db_database, "cheesy_action_items"
  env :wordpress_auth_url, "http://www.team254.com/auth/"
end
