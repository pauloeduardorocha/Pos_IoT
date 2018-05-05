package br.cefetmg.iot.aula7;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    TextView text_result;
    Button button_recente_temp;
    Button button_list_temp;
    Button button_atualizar_temp;

    Button button_recente_umid;
    Button button_list_umid;
    Button button_atualizar_umid;

    Button button_recente_atuad;
    Button button_list_atuad;
    Button button_atualizar_atuad;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button_recente_temp = (Button) findViewById(R.id.button_recente_temp);

        button_recente_temp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent temperatura_recente = new Intent(getApplicationContext(), TemperaturaRecenteActivity.class);

               startActivity(temperatura_recente);

            }
        });

        button_list_temp = (Button) findViewById(R.id.button_list_temp);

        button_list_temp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent temperatura_list = new Intent(getApplicationContext(), TemperaturasActivity.class);

                startActivity(temperatura_list);

            }
        });

        button_atualizar_temp = (Button) findViewById(R.id.button_atualizar_temp);

        button_atualizar_temp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent temperatura_atualizar = new Intent(getApplicationContext(), TemperaturaAtualizarActivity.class);

                startActivity(temperatura_atualizar);

            }
        });

        button_recente_umid = (Button) findViewById(R.id.button_recente_umid);

        button_recente_umid.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent umidade_recente = new Intent(getApplicationContext(), UmidadeRecenteActivity.class);

                startActivity(umidade_recente);

            }
        });

        button_list_umid = (Button) findViewById(R.id.button_list_umid);

        button_list_umid.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent umidade_list = new Intent(getApplicationContext(), UmidadesActivity.class);

                startActivity(umidade_list);

            }
        });

        button_atualizar_umid = (Button) findViewById(R.id.button_atualizar_umid);

        button_atualizar_umid.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent umidade_atualizar = new Intent(getApplicationContext(), UmidadeAtualizarActivity.class);

                startActivity(umidade_atualizar);

            }
        });

        button_recente_atuad = (Button) findViewById(R.id.button_recente_atuad);

        button_recente_atuad.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent atuador_recente = new Intent(getApplicationContext(), AtuadorRecenteActivity.class);

                startActivity(atuador_recente);

            }
        });

        button_list_atuad = (Button) findViewById(R.id.button_list_atuad);

        button_list_atuad.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent atuador_list = new Intent(getApplicationContext(), AtuadoresActivity.class);

                startActivity(atuador_list);

            }
        });

        button_atualizar_atuad = (Button) findViewById(R.id.button_atualizar_atuad);

        button_atualizar_atuad.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent atuador_atualizar = new Intent(getApplicationContext(), AtuadorAtualizarActivity.class);

                startActivity(atuador_atualizar);

            }
        });

    }
}
