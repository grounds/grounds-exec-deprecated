class GroundDecorator < BaseDecorator
  def editor
    {
      theme: h.session[:theme] ||= GroundEditor.default_option_code(:theme),
      indent: h.session[:indent] ||= GroundEditor.default_option_code(:indent),
      language: self.language,
      run_endpoint: WebSocket.run_endpoint
    }
  end

  def themes
    GroundEditor.options(:theme)
  end

  def indents
    GroundEditor.options(:indent)
  end
  
  def languages
    GroundEditor.options(:language)
  end
end


