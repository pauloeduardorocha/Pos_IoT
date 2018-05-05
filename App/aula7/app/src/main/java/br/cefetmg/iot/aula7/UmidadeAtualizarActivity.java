package br.cefetmg.iot.aula7;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

public class UmidadeAtualizarActivity extends AppCompatActivity {

    EditText editText_valor_umid_atu;
    Button button_enviar_umid_atu;
    TextView textView_response_umid_atu;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_umidade_atualizar);

        editText_valor_umid_atu = (EditText) findViewById(R.id.editText_valor_umid_atu);

        button_enviar_umid_atu = (Button) findViewById(R.id.button_enviar_umid_atu);

        textView_response_umid_atu = (TextView)findViewById(R.id.textView_response_umid_atu);
        button_enviar_umid_atu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String valor = String.valueOf(editText_valor_umid_atu.getText());

                Map<String, String> postData = new HashMap<>();
                postData.put("valor", valor);

                Calendar c = Calendar.getInstance();
                SimpleDateFormat dateformat = new SimpleDateFormat("dd-MMM-yyyy hh:mm:ss");
                String datetime = dateformat.format(c.getTime());
                postData.put("time", datetime);

                PostUmidade post = new PostUmidade(postData, textView_response_umid_atu);
                post.execute();

            }
        });




    }
}
