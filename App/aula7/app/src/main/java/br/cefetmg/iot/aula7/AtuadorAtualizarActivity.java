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

public class AtuadorAtualizarActivity extends AppCompatActivity {

    EditText editText_valor_atuad;
    Button button_enviar_atuad;
    TextView textView_response_atuad;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_atuador_atualizar);

        editText_valor_atuad = (EditText) findViewById(R.id.editText_valor_atuad);

        button_enviar_atuad = (Button) findViewById(R.id.button_enviar_atuad);

        textView_response_atuad = (TextView)findViewById(R.id.textView_response_atuad);
        button_enviar_atuad.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String valor = String.valueOf(editText_valor_atuad.getText());

                Map<String, String> postData = new HashMap<>();
                postData.put("valor", valor);

                Calendar c = Calendar.getInstance();
                SimpleDateFormat dateformat = new SimpleDateFormat("dd-MMM-yyyy hh:mm:ss");
                String datetime = dateformat.format(c.getTime());
                postData.put("time", datetime);

                PostAtuador post = new PostAtuador(postData, textView_response_atuad);
                post.execute();

            }
        });




    }
}
