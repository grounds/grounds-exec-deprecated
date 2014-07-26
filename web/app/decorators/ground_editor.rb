require 'yaml'

module GroundEditor
  extend self
 
  config = YAML.load_file("#{Rails.root}/config/editor.yml")
  config.each do |key, value|
    self.send(:define_method, "__#{key}__") { value }
  end

  def default_option(option)
    code, label = options(option).first
    format_option(code, label) if code.present? 
  end

  def option(option, code)
    options = options(option)
    label = options[code]
    format_option(code, label) if label.present?
  end

  def options(option)
    send("__#{option.to_s.pluralize(2)}__")
  end

  def has_option?(option, code)
    options(option).has_key?(code)
  end

  private

  def format_option(code, label)
    { code: code, label: label} 
  end
end