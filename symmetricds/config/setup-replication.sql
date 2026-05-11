-- Setup Node Groups (idempotent)
INSERT INTO sym_node_group (node_group_id, description) 
  VALUES ('corp', 'PostgreSQL Master') ON CONFLICT DO NOTHING;
INSERT INTO sym_node_group (node_group_id, description) 
  VALUES ('store', 'MySQL Replica') ON CONFLICT DO NOTHING;

-- Setup Node Group Links
INSERT INTO sym_node_group_link (source_node_group_id, target_node_group_id, data_event_action) 
  VALUES ('corp', 'store', 'W') ON CONFLICT DO NOTHING;

-- Setup Channels
INSERT INTO sym_channel (channel_id, processing_order, max_batch_size, enabled, description) 
  VALUES ('auth_channel', 1, 100000, 1, 'Authentication Data Channel') ON CONFLICT DO NOTHING;

-- Setup Triggers (PostgreSQL to MySQL)
INSERT INTO sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) 
  VALUES ('user_trigger', 'User', 'auth_channel', current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) 
  VALUES ('student_trigger', 'Student', 'auth_channel', current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) 
  VALUES ('tutor_trigger', 'Tutor', 'auth_channel', current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO sym_trigger (trigger_id, source_table_name, channel_id, last_update_time, create_time) 
  VALUES ('refresh_token_trigger', 'RefreshToken', 'auth_channel', current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;

-- Setup Routers
INSERT INTO sym_router (router_id, source_node_group_id, target_node_group_id, router_type, create_time, last_update_time) 
  VALUES ('corp_to_store', 'corp', 'store', 'default', current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;

-- Setup Trigger Routers
INSERT INTO sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) 
  VALUES ('user_trigger', 'corp_to_store', 10, current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) 
  VALUES ('student_trigger', 'corp_to_store', 20, current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) 
  VALUES ('tutor_trigger', 'corp_to_store', 30, current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;
INSERT INTO sym_trigger_router (trigger_id, router_id, initial_load_order, last_update_time, create_time) 
  VALUES ('refresh_token_trigger', 'corp_to_store', 40, current_timestamp, current_timestamp) ON CONFLICT DO NOTHING;
