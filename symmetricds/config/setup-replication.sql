-- Setup Node Groups
insert into sym_node_group (node_group_id, description) values ('corp', 'PostgreSQL Master');
insert into sym_node_group (node_group_id, description) values ('store', 'MySQL Replica');

-- Setup Node Group Links
insert into sym_node_group_link (source_node_group_id, target_node_group_id, data_event_action) values ('corp', 'store', 'W');

-- Setup Channels
insert into sym_channel (channel_id, processing_order, max_batch_size, enabled, description) values ('auth_channel', 1, 100000, 1, 'Authentication Data Channel');

-- Setup Triggers (PostgreSQL to MySQL)
-- User Table
insert into sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) values ('user_trigger', 'User', 'auth_channel', current_timestamp, current_timestamp);
-- Student Table
insert into sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) values ('student_trigger', 'Student', 'auth_channel', current_timestamp, current_timestamp);
-- Tutor Table
insert into sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) values ('tutor_trigger', 'Tutor', 'auth_channel', current_timestamp, current_timestamp);
-- RefreshToken Table
insert into sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) values ('refresh_token_trigger', 'RefreshToken', 'auth_channel', current_timestamp, current_timestamp);

-- Setup Routers
insert into sym_router (router_id, source_node_group_id, target_node_group_id, router_type, create_time, last_update_time) values ('corp_to_store', 'corp', 'store', 'default', current_timestamp, current_timestamp);

-- Setup Trigger Routers
insert into sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) values ('user_trigger', 'corp_to_store', 10, current_timestamp, current_timestamp);
insert into sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) values ('student_trigger', 'corp_to_store', 20, current_timestamp, current_timestamp);
insert into sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) values ('tutor_trigger', 'corp_to_store', 30, current_timestamp, current_timestamp);
insert into sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) values ('refresh_token_trigger', 'corp_to_store', 40, current_timestamp, current_timestamp);
